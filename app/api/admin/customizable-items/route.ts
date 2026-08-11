import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("customizable_items")
    .select("*, customizable_item_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, starting_price, image_urls, sizes, lengths, colors } = body;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const slug = `${slugify(name)}-${Date.now().toString(36)}`;

  const { data: item, error } = await supabaseAdmin
    .from("customizable_items")
    .insert([
      {
        name,
        description,
        starting_price: starting_price || null,
        slug,
        sizes: sizes && sizes.length > 0 ? sizes : null,
        lengths: lengths && lengths.length > 0 ? lengths : null,
        colors: colors && colors.length > 0 ? colors : null,
      },
    ])
    .select()
    .single();


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (image_urls && image_urls.length > 0) {
    const imageRows = image_urls.map((url: string, index: number) => ({
      item_id: item.id,
      image_url: url,
      sort_order: index,
    }));

    const { error: imgError } = await supabaseAdmin
      .from("customizable_item_images")
      .insert(imageRows);

    if (imgError) {
      return NextResponse.json({ error: imgError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ item });
}

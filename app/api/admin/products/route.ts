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
    .from("products")
    .select("*, product_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    category,
    price,
    collection_id,
    image_urls,
    description,
    size_options,
    length_options,
    color_options,
  } = body;

  if (!name || !category || !price) {
    return NextResponse.json(
      { error: "Name, category, and price are required" },
      { status: 400 }
    );
  }

  const slug = `${slugify(name)}-${Date.now().toString(36)}`;

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .insert([
      {
        name,
        category,
        price,
        collection_id: collection_id || null,
        slug,
        description,
        size_options: size_options && size_options.length > 0 ? size_options : null,
        length_options: length_options && length_options.length > 0 ? length_options : null,
        color_options: color_options && color_options.length > 0 ? color_options : null,
      },
    ])
    .select()
    .single();



  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (image_urls && image_urls.length > 0) {
    const imageRows = image_urls.map((url: string, index: number) => ({
      product_id: product.id,
      image_url: url,
      sort_order: index,
    }));

    const { error: imgError } = await supabaseAdmin
      .from("product_images")
      .insert(imageRows);

    if (imgError) {
      return NextResponse.json({ error: imgError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ product });
}

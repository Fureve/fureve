import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*, product_images(*)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ product: data });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const {
    name,
    category,
    price,
    collection_id,
    new_image_urls,
    removed_image_ids,
    description,
    size_options,
    length_options,
    color_options,
  } = body;

  const { data: product, error } = await supabaseAdmin
    .from("products")
    .update({
      name,
      category,
      price,
      collection_id: collection_id || null,
      description,
      size_options: size_options && size_options.length > 0 ? size_options : null,
      length_options: length_options && length_options.length > 0 ? length_options : null,
      color_options: color_options && color_options.length > 0 ? color_options : null,
    })
    .eq("id", id)
    .select()
    .single();



  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (removed_image_ids && removed_image_ids.length > 0) {
    const { error: removeError } = await supabaseAdmin
      .from("product_images")
      .delete()
      .in("id", removed_image_ids);

    if (removeError) {
      return NextResponse.json({ error: removeError.message }, { status: 500 });
    }
  }

  if (new_image_urls && new_image_urls.length > 0) {
    const { data: existingImages } = await supabaseAdmin
      .from("product_images")
      .select("sort_order")
      .eq("product_id", id)
      .order("sort_order", { ascending: false })
      .limit(1);

    const startOrder =
      existingImages && existingImages.length > 0
        ? existingImages[0].sort_order + 1
        : 0;

    const imageRows = new_image_urls.map((url: string, index: number) => ({
      product_id: id,
      image_url: url,
      sort_order: startOrder + index,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

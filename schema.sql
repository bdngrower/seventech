-- schema.sql
-- Run this script in your Supabase SQL Editor.

-- Users
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'CUSTOMER', -- 'ADMIN' or 'CUSTOMER'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Phone Models
CREATE TABLE IF NOT EXISTS phone_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    width_mm NUMERIC(10,2),
    height_mm NUMERIC(10,2),
    safe_area_width_mm NUMERIC(10,2),
    safe_area_height_mm NUMERIC(10,2),
    bleed_padding_mm NUMERIC(10,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Print Templates (Masks and Overlays for the customizer)
CREATE TABLE IF NOT EXISTS print_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_model_id UUID REFERENCES phone_models(id) ON DELETE CASCADE,
    mask_image_url TEXT NOT NULL,
    overlay_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    base_price NUMERIC(10,2) NOT NULL,
    is_customizable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product Variants (Type of case, finish, etc)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL, -- e.g., 'Silicone', 'Anti-impact', 'Hard'
    finish VARCHAR(100),        -- e.g., 'Matte', 'Glossy'
    price_adjustment NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    status VARCHAR(100) DEFAULT 'CREATED', -- CREATED, AWAITING_PAYMENT, PAID, IN_PRODUCTION, SHIPPED, DELIVERED, CANCELED
    total NUMERIC(10,2) NOT NULL,
    subtotal NUMERIC(10,2) NOT NULL,
    shipping_cost NUMERIC(10,2) DEFAULT 0,
    shipping_address JSONB NOT NULL,
    tracking_code VARCHAR(100),
    payment_method VARCHAR(100),
    payment_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
    product_variant_id UUID REFERENCES product_variants(id) ON DELETE RESTRICT,
    phone_model_id UUID REFERENCES phone_models(id) ON DELETE RESTRICT,
    quantity INTEGER DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Assets (Mockups, Production Files)
CREATE TABLE IF NOT EXISTS order_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'ORIGINAL_UPLOAD', 'PREVIEW_THUMBNAIL', 'PRODUCTION_FILE'
    url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings (Global Admin Configurations)
CREATE TABLE IF NOT EXISTS settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES
('contact_phone', '"5511999999999"', 'Contact Phone Number (WhatsApp)'),
('contact_email', '"contato@seventech.com.br"', 'Contact Email Address'),
('whatsapp_message', '"Olá! Gostaria de tirar uma dúvida sobre meu pedido."', 'Default WhatsApp Message'),
('production_days', '3', 'Average Production Days'),
('payments_active', 'true', 'Are payments active?'),
('shipping_active', 'true', 'Is shipping active?')
ON CONFLICT (key) DO NOTHING;

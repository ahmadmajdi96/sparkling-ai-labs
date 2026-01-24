import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple hash function for password (in production, use bcrypt)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { action, ...data } = await req.json();
    
    // Handle login
    if (action === 'login') {
      const { email, password } = data;
      
      if (!email || !password) {
        return new Response(
          JSON.stringify({ error: 'Email and password are required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('id, email, password_hash')
        .eq('email', email)
        .maybeSingle();
      
      if (error || !admin) {
        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const isValid = await verifyPassword(password, admin.password_hash);
      
      if (!isValid) {
        return new Response(
          JSON.stringify({ error: 'Invalid credentials' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Generate a simple session token
      const token = crypto.randomUUID();
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          admin: { id: admin.id, email: admin.email },
          token 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Handle create admin (only for initial setup)
    if (action === 'create_admin') {
      const { email, password, setup_key } = data;
      
      // Verify setup key for security
      if (setup_key !== 'CORTANEX_INITIAL_SETUP_2024') {
        return new Response(
          JSON.stringify({ error: 'Invalid setup key' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const passwordHash = await hashPassword(password);
      
      const { data: admin, error } = await supabase
        .from('admin_users')
        .insert({ email, password_hash: passwordHash })
        .select('id, email')
        .single();
      
      if (error) {
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ success: true, admin }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // CRUD operations for portfolio systems
    if (action === 'get_systems') {
      const { data: systems, error } = await supabase
        .from('portfolio_systems')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ systems }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'create_system') {
      const { system } = data;
      const { data: newSystem, error } = await supabase
        .from('portfolio_systems')
        .insert(system)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ system: newSystem }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'update_system') {
      const { id, updates } = data;
      const { data: updatedSystem, error } = await supabase
        .from('portfolio_systems')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ system: updatedSystem }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'delete_system') {
      const { id } = data;
      const { error } = await supabase
        .from('portfolio_systems')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // CRUD operations for screenshots
    if (action === 'get_screenshots') {
      const { system_id } = data;
      const { data: screenshots, error } = await supabase
        .from('portfolio_screenshots')
        .select('*')
        .eq('system_id', system_id)
        .order('display_order');
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ screenshots }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'add_screenshot') {
      const { screenshot } = data;
      const { data: newScreenshot, error } = await supabase
        .from('portfolio_screenshots')
        .insert(screenshot)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ screenshot: newScreenshot }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'delete_screenshot') {
      const { id } = data;
      const { error } = await supabase
        .from('portfolio_screenshots')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // CRUD operations for categories
    if (action === 'get_categories') {
      const { system_id } = data;
      const { data: categories, error } = await supabase
        .from('portfolio_categories')
        .select('*, portfolio_features(*)')
        .eq('system_id', system_id)
        .order('display_order');
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ categories }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'create_category') {
      const { category } = data;
      const { data: newCategory, error } = await supabase
        .from('portfolio_categories')
        .insert(category)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ category: newCategory }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'update_category') {
      const { id, updates } = data;
      const { data: updatedCategory, error } = await supabase
        .from('portfolio_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ category: updatedCategory }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'delete_category') {
      const { id } = data;
      const { error } = await supabase
        .from('portfolio_categories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // CRUD operations for features
    if (action === 'create_feature') {
      const { feature } = data;
      const { data: newFeature, error } = await supabase
        .from('portfolio_features')
        .insert(feature)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ feature: newFeature }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'update_feature') {
      const { id, updates } = data;
      const { data: updatedFeature, error } = await supabase
        .from('portfolio_features')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ feature: updatedFeature }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    if (action === 'delete_feature') {
      const { id } = data;
      const { error } = await supabase
        .from('portfolio_features')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Bulk import for initial data migration
    if (action === 'bulk_import') {
      const { systems } = data;
      
      for (const systemData of systems) {
        // Insert system
        const { data: system, error: sysError } = await supabase
          .from('portfolio_systems')
          .insert({
            name: systemData.name,
            tagline: systemData.tagline,
            description: systemData.description,
            icon: systemData.icon,
            gradient: systemData.gradient,
            display_order: systemData.display_order,
            is_active: true
          })
          .select()
          .single();
        
        if (sysError) throw sysError;
        
        // Insert screenshots
        if (systemData.screenshots?.length) {
          const screenshots = systemData.screenshots.map((url: string, i: number) => ({
            system_id: system.id,
            image_url: url,
            display_order: i
          }));
          
          const { error: ssError } = await supabase
            .from('portfolio_screenshots')
            .insert(screenshots);
          
          if (ssError) throw ssError;
        }
        
        // Insert categories and features
        if (systemData.categories?.length) {
          for (let i = 0; i < systemData.categories.length; i++) {
            const cat = systemData.categories[i];
            
            const { data: category, error: catError } = await supabase
              .from('portfolio_categories')
              .insert({
                system_id: system.id,
                title: cat.title,
                icon: cat.icon,
                gradient: cat.gradient || 'from-primary to-secondary',
                display_order: i
              })
              .select()
              .single();
            
            if (catError) throw catError;
            
            // Insert features
            if (cat.features?.length) {
              const features = cat.features.map((f: any, j: number) => ({
                category_id: category.id,
                name: f.name,
                description: f.description,
                display_order: j
              }));
              
              const { error: featError } = await supabase
                .from('portfolio_features')
                .insert(features);
              
              if (featError) throw featError;
            }
          }
        }
      }
      
      return new Response(
        JSON.stringify({ success: true, message: 'Bulk import completed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Contact messages actions
    if (action === 'get_messages') {
      const { data: messages, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ messages }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'mark_message_read') {
      const { id } = data;
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'delete_message') {
      const { id } = data;
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get full portfolio data for public display
    if (action === 'get_portfolio') {
      const { data: systems, error: sysError } = await supabase
        .from('portfolio_systems')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      
      if (sysError) throw sysError;

      // Get all data in parallel
      const systemIds = systems.map(s => s.id);
      
      const [screenshotsRes, categoriesRes] = await Promise.all([
        supabase
          .from('portfolio_screenshots')
          .select('*')
          .in('system_id', systemIds)
          .order('display_order'),
        supabase
          .from('portfolio_categories')
          .select('*, portfolio_features(*)')
          .in('system_id', systemIds)
          .order('display_order')
      ]);

      if (screenshotsRes.error) throw screenshotsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      // Group data by system
      const portfolioData = systems.map(system => ({
        ...system,
        screenshots: screenshotsRes.data
          .filter(s => s.system_id === system.id)
          .map(s => s.image_url),
        categories: categoriesRes.data
          .filter(c => c.system_id === system.id)
          .map(cat => ({
            ...cat,
            features: cat.portfolio_features?.sort((a: any, b: any) => a.display_order - b.display_order) || []
          }))
      }));

      return new Response(
        JSON.stringify({ systems: portfolioData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'Unknown action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

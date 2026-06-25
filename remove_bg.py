from PIL import Image
import numpy as np

def remove_white_bg(input_path, output_path):
    try:
        Image.MAX_IMAGE_PIXELS = None # Disable DOS warning for our own file
        img = Image.open(input_path).convert("RGBA")
        
        # Resize first to something reasonable, e.g. 1000px width
        aspect_ratio = img.height / img.width
        new_width = 1000
        new_height = int(new_width * aspect_ratio)
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Vectorized background removal
        data = np.array(img)
        
        # Find pixels that are white-ish (R>220, G>220, B>220)
        r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
        white_mask = (r > 220) & (g > 220) & (b > 220)
        
        # Set alpha to 0 for those pixels
        data[:,:,3][white_mask] = 0
        
        new_img = Image.fromarray(data)
        new_img.save(output_path, "PNG")
        print("Success")
    except Exception as e:
        print("Error:", e)

remove_white_bg('public/logo.jpeg', 'public/logo.png')

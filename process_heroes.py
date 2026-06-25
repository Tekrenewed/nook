from rembg import remove
from PIL import Image

for i in range(1, 5):
    input_path = f'public/hero{i}.png'
    output_path = f'public/hero{i}.png'
    try:
        with open(input_path, 'rb') as i_file:
            input_data = i_file.read()
        
        output_data = remove(input_data)
        
        with open(output_path, 'wb') as o_file:
            o_file.write(output_data)
        print(f"Successfully processed {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

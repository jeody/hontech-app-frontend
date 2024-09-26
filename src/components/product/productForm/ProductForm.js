import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ProductForm.scss';
import Card from '../../card/Card';

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          <Card cardClass={'group'}>
            <label>Product Image</label>
            <code className='--color-dark'>
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type='file'
              name='image'
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt='product' />
              </div>
            ) : (
              <p>No image set for this product.</p>
            )}
          </Card>
          <br />
          <label>Product Name:</label>
          <input
            type='text'
            placeholder='Product name'
            name='name'
            value={product?.name}
            onChange={handleInputChange}
          />

          <label>Group:</label>
          <input
            type='text'
            placeholder='Materials/Parts'
            name='category'
            value={product?.category}
            onChange={handleInputChange}
          />

          <label>Category:</label>
          <input
            type='text'
            placeholder='Product Category'
            name='subcategory'
            value={product?.subcategory}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type='text'
            placeholder='Product Price'
            name='price'
            value={product?.price}
            onChange={handleInputChange}
          />

          <label>SRP:</label>
          <input
            type='text'
            placeholder='Retail Price'
            name='unitRetailPrice'
            value={product?.unitRetailPrice}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type='text'
            placeholder='Product Quantity'
            name='quantity'
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label>Purchase Date:</label>
          <input
            type='date'
            placeholder='Date Purchase'
            name='purchaseDate'
            value={product?.purchaseDate}
            onChange={handleInputChange}
          />
          <p>&nbsp;</p>
          <label>Product Description:</label>
          <ReactQuill
            theme='snow'
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className='--my'>
            <button type='submit' className='--btn --btn-primary'>
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['clean'],
  ],
};
ProductForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'video',
  'image',
  'code-block',
  'align',
];

export default ProductForm;

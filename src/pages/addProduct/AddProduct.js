import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createProduct,
  selectIsLoading,
} from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  const isLoading = useSelector(selectIsLoading);

  const {
    name,
    category,
    price,
    quantity,
    subcategory,
    purchaseDate,
    unitRetailPrice,
  } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + '-' + number;
    return sku;
  };

  const generateREF = (subcategory) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const ref = letter + '-' + number;
    return ref;
  };

  // unitProfit = (unitRetaillPrice - unitActualPrice)
  const unitProfit = (price, unitRetailPrice) => {
    const profit = unitRetailPrice - price;
    return profit;
  };

  // unitPercentage = (unitProfit / unitActualPrice * 100)
  const unitPercentage = (price, unitRetailPrice) => {
    const newprofit = unitRetailPrice - price;
    const percentage = (newprofit / price) * 100;
    return percentage;
  };

  // totalActualPrice = (beginningInventory * price)
  const totalActualPrice = (price, quantity) => {
    const totalPrice = quantity * price;
    return totalPrice;
  };

  // totalRetailPrice = (beginningInventory * price)
  const totalRetailPrice = (unitRetailPrice, quantity) => {
    const retailPrice = quantity * unitRetailPrice;
    return retailPrice;
  };

  // totalProfit = (totalRetailPrice - totalActualPrice)
  const totalProfit = (price, unitRetailPrice, quantity) => {
    const retailPrice = quantity * unitRetailPrice;
    const actualPrice = quantity * price;
    const kita = retailPrice - actualPrice;
    return kita;
  };

  // totalPercentage = (totalProfit / totalActualPrice * 100)
  const totalPercentage = (price, unitRetailPrice, quantity) => {
    const retailPrice = quantity * unitRetailPrice;
    const actualPrice = quantity * price;
    const kita = retailPrice - actualPrice;
    const percentTotal = (kita / actualPrice) * 100;
    if (quantity === 0) {
      return kita;
    }
    return percentTotal;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', generateSKU(category));
    formData.append('category', category);
    formData.append('quantity', Number(quantity));
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', productImage);
    formData.append('subcategory', subcategory);
    formData.append('refNum', generateREF(subcategory));
    formData.append('beginningInventory', Number(quantity));
    formData.append('purchaseDate', purchaseDate);
    formData.append('unitActualPrice', price);
    formData.append('unitRetailPrice', unitRetailPrice);
    formData.append('unitProfit', unitProfit(price, unitRetailPrice));
    formData.append('unitPercentage', unitPercentage(price, unitRetailPrice));
    formData.append(
      'totalActualPrice',
      totalActualPrice(price, Number(quantity))
    );
    formData.append(
      'totalRetailPrice',
      totalRetailPrice(unitRetailPrice, Number(quantity))
    );
    formData.append(
      'totalProfit',
      totalProfit(price, unitRetailPrice, Number(quantity))
    );
    formData.append(
      'totalPercentage',
      totalPercentage(price, unitRetailPrice, Number(quantity))
    );

    console.log(...formData);

    await dispatch(createProduct(formData));

    navigate('/dashboard');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className='--mt'>Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;

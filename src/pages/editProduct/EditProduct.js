import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from '../../redux/features/product/productSlice';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ''
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
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

  // totalActualPrice = (beginningInventory * price)
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
    //return percentTotal;
    if (quantity === 0) {
      return kita;
    }
    return percentTotal;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product?.name);
    formData.append('category', product?.category);
    formData.append('quantity', product?.quantity);
    formData.append('price', product?.price);
    formData.append('description', description);
    if (productImage) {
      formData.append('image', productImage);
    }
    formData.append('subcategory', product?.subcategory);
    formData.append('beginningInventory', product?.quantity);
    formData.append('purchaseDate', product?.purchaseDate);
    formData.append('unitActualPrice', product?.price);
    formData.append('unitRetailPrice', product?.unitRetailPrice);
    formData.append(
      'unitProfit',
      unitProfit(product?.price, product?.unitRetailPrice)
    );
    formData.append(
      'unitPercentage',
      unitPercentage(product?.price, product?.unitRetailPrice)
    );
    formData.append(
      'totalActualPrice',
      totalActualPrice(product?.price, product?.quantity)
    );
    formData.append(
      'totalRetailPrice',
      totalRetailPrice(product?.unitRetailPrice, product?.quantity)
    );
    formData.append(
      'totalProfit',
      totalProfit(product?.price, product?.unitRetailPrice, product?.quantity)
    );
    formData.append(
      'totalPercentage',
      totalPercentage(
        product?.price,
        product?.unitRetailPrice,
        product?.quantity
      )
    );

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate('/dashboard');
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className='--mt'>Edit Product</h3>
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

export default EditProduct;

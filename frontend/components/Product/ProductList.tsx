import React from 'react';
import  ProductCard  from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductListProps {
  products: Product[];
  loading?: boolean;
  error?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading = false, error = '' }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="bg-gray-200 h-48 w-full"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
        <p className="text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-primary-color text-white px-4 py-2 rounded-md hover:bg-dark-color transition-colors"
        >
          Повторить попытку
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.901-6.074 2.377M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Нет продуктов</h3>
        <p className="mt-1 text-sm text-gray-500">Продукты скоро появятся в каталоге.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

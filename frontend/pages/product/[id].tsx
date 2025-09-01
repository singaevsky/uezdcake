// frontend/pages/product/[id].tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  // Детали для страницы продукта
  detailed_description?: string;
  ingredients?: string[];
  weight_options?: { weight: string; price: number }[];
  fillings?: string[];
  category?: string;
  gallery?: string[]; // Дополнительные изображения
}

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [selectedFillings, setSelectedFillings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  // Имитация загрузки данных продукта
  useEffect(() => {
    if (id) {
      // В реальном приложении здесь будет API call
      setTimeout(() => {
        // Имитация разных продуктов по ID
        const mockProducts: Record<string, Product> = {
          '1': {
            id: 1,
            name: "Медовик",
            price: 1200,
            image: "/images/products/medovik.jpg",
            description: "Классический медовый торт с нежным сливочным кремом",
            detailed_description: "Наш фирменный медовик - это сочетание ароматных коржей, пропитанных натуральным медом, и воздушного сливочного крема. Каждый корж готовится по традиционному рецепту, что придает торту неповторимый вкус и аромат. Украшен карамелизированными краями коржей и посыпан молотым миндалем.",
            ingredients: [
              "Мед натуральный",
              "Мука пшеничная высшего сорта",
              "Сливочное масло",
              "Сахар",
              "Яйца куриные",
              "Сливки 33%",
              "Ванильный экстракт",
              "Сода пищевая"
            ],
            weight_options: [
              { weight: "1 кг", price: 1200 },
              { weight: "1.5 кг", price: 1700 },
              { weight: "2 кг", price: 2200 }
            ],
            fillings: [
              "Медовая",
              "Сливочный пломбир с ягодами",
              "Творожно-ягодная"
            ],
            category: "cakes",
            gallery: [
              "/images/products/medovik-1.jpg",
              "/images/products/medovik-2.jpg",
              "/images/products/medovik-3.jpg"
            ]
          },
          '2': {
            id: 2,
            name: "Чёрный лес",
            price: 1500,
            image: "/images/products/cherny-les.jpg",
            description: "Шоколадный бисквит с вишней и взбитыми сливками",
            detailed_description: "Классический торт 'Чёрный лес' - это изысканное сочетание нежного шоколадного бисквита, кисло-сладкой вишни и воздушных сливок. Торт пропитан вишневым сиропом и украшен шоколадной стружкой и мараскиновыми вишенками.",
            ingredients: [
              "Шоколад",
              "Мука пшеничная",
              "Яйца",
              "Сахар",
              "Сливочное масло",
              "Сливки 33%",
              "Вишня кислая",
              "Вишневый сироп",
              "Шоколадная стружка"
            ],
            weight_options: [
              { weight: "1 кг", price: 1500 },
              { weight: "1.5 кг", price: 2100 },
              { weight: "2 кг", price: 2700 }
            ],
            fillings: [
              "Шоколадная с арахисом и карамелью",
              "Вишня",
              "Шоколадно-ванильная"
            ],
            category: "cakes",
            gallery: [
              "/images/products/cherny-les-1.jpg",
              "/images/products/cherny-les-2.jpg"
            ]
          }
        };

        const foundProduct = mockProducts[id as string];
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedWeight(foundProduct.weight_options?.[0]?.weight || '');
        } else {
          // Если продукт не найден, можно перенаправить на 404
          console.log("Продукт не найден");
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const getCurrentPrice = () => {
    if (!product || !selectedWeight) return product?.price || 0;
    const weightOption = product.weight_options?.find(w => w.weight === selectedWeight);
    return weightOption ? weightOption.price : product.price;
  };

  const handleAddToCart = () => {
    if (!product) return;

    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: getCurrentPrice(),
      image: product.image,
      weight: selectedWeight,
      fillings: selectedFillings,
      quantity: quantity
    };

    // Получаем текущую корзину из localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Проверяем, есть ли уже такой товар с такими же параметрами
    const existingItemIndex = cart.findIndex((item: any) =>
      item.id === itemToAdd.id &&
      item.weight === itemToAdd.weight &&
      JSON.stringify(item.fillings) === JSON.stringify(itemToAdd.fillings)
    );

    if (existingItemIndex > -1) {
      // Если есть, увеличиваем количество
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Если нет, добавляем новый элемент
      cart.push(itemToAdd);
    }

    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));

    // Можно показать уведомление или открыть корзину
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-chocolate mb-4">Продукт не найден</h1>
          <Link href="/catalog" className="text-chocolate hover:underline">
            ← Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Head>
        <title>{product.name} - Уездный Кондитер</title>
        <meta name="description" content={product.description} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/catalog" className="text-chocolate hover:underline flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Назад в каталог
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Изображения продукта */}
            <div>
              <div className="mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              {product.gallery && product.gallery.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-75"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Информация о продукте */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-chocolate bg-rose rounded-full">
                  {product.category === 'cakes' ? 'Торт' :
                   product.category === 'desserts' ? 'Десерт' :
                   product.category === 'cupcakes' ? 'Капкейки' : 'Продукт'}
                </span>
                <h1 className="text-3xl font-serif font-bold text-chocolate mt-2">{product.name}</h1>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-bold text-chocolate">
                  {getCurrentPrice().toLocaleString()} ₽
                  {selectedWeight && (
                    <span className="text-lg font-normal text-gray-600 ml-2">за {selectedWeight}</span>
                  )}
                </p>
              </div>

              {/* Выбор веса */}
              {product.weight_options && product.weight_options.length > 1 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Выберите вес:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.weight_options.map((option) => (
                      <button
                        key={option.weight}
                        onClick={() => setSelectedWeight(option.weight)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedWeight === option.weight
                            ? 'border-chocolate bg-rose text-chocolate font-bold'
                            : 'border-gray-300 hover:border-chocolate'
                        }`}
                      >
                        {option.weight} - {option.price.toLocaleString()} ₽
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Выбор начинок */}
              {product.fillings && product.fillings.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Выберите начинки (до 3):</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.fillings.map((filling) => (
                      <div
                        key={filling}
                        onClick={() => {
                          if (selectedFillings.includes(filling)) {
                            setSelectedFillings(selectedFillings.filter(f => f !== filling));
                          } else if (selectedFillings.length < 3) {
                            setSelectedFillings([...selectedFillings, filling]);
                          }
                        }}
                        className={`p-3 border rounded-lg cursor-pointer transition ${
                          selectedFillings.includes(filling)
                            ? 'border-chocolate bg-rose'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                            selectedFillings.includes(filling) ? 'bg-chocolate border-chocolate' : 'border-gray-400'
                          }`}>
                            {selectedFillings.includes(filling) && (
                              <span className="text-white text-xs">✓</span>
                            )}
                          </div>
                          <span>{filling}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Выбрано: {selectedFillings.length}/3 начинок
                  </div>
                </div>
              )}

              {/* Количество */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Количество:</h3>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l"
                  >
                    -
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Кнопка добавления в корзину */}
              <div className="mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3"
                >
                  Добавить в корзину
                </button>
              </div>

              {/* Ингредиенты */}
              {product.ingredients && (
                <div>
                  <h3 className="font-semibold mb-2">Ингредиенты:</h3>
                  <ul className="list-disc pl-5 text-gray-600">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="mb-1">{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Подробное описание */}
          {product.detailed_description && (
            <div className="border-t border-gray-200 p-6">
              <h2 className="text-2xl font-serif font-bold text-chocolate mb-4">Описание</h2>
              <p className="text-gray-700 whitespace-pre-line">{product.detailed_description}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;

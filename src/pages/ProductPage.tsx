import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: 7,
    name: 'АК-12',
    price: 34990,
    inStock: true,
    rating: 4.8,
    reviews: 47,
    images: [
      'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/7245349d-0e96-470a-a399-060e94364e3c.jpg',
      'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/c987d412-29af-4511-9111-3861eab9cee5.jpg',
    ],
    description: 'Современная российская штурмовая винтовка АК-12 для страйкбола. Высокая точность стрельбы, надежная конструкция и реалистичный внешний вид делают эту модель идеальным выбором для профессионалов.',
    specs: {
      caliber: '6 мм',
      capacity: '350 шариков',
      length: '940 мм',
      weight: '3.2 кг',
      power: '1.5 Дж',
      hopup: 'Регулируемый',
      material: 'Металл + ABS пластик',
      fireModes: 'Одиночный / Автоматический'
    },
    features: [
      'Металлический корпус и внутренние детали',
      'Складной приклад',
      'Планка Пикатинни для установки оптики',
      'Регулируемый HOP-UP',
      'Реалистичная отдача',
      'Магазин увеличенной емкости',
      'Пламегаситель съемный'
    ],
    included: [
      'Винтовка АК-12',
      'Магазин на 350 шариков',
      'Документация',
      'Ремень для переноски',
      'Шомпол для чистки'
    ]
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Icon name="Target" size={32} className="text-accent" />
            <h1 className="text-3xl font-bold tracking-tight">AIRSOFT ARSENAL</h1>
          </button>
          <Button variant="outline" size="lg" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, idx) => (
                <Card
                  key={idx}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedImage === idx ? 'ring-2 ring-accent' : 'hover:ring-2 ring-muted'
                  }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <CardContent className="p-0">
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-accent text-lg px-3 py-1">В наличии</Badge>
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={20} className="fill-accent text-accent" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} отзывов)</span>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{product.description}</p>
              <div className="text-4xl font-bold mb-6">{product.price.toLocaleString()} ₽</div>
            </div>

            <Separator />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={decreaseQuantity}
                >
                  <Icon name="Minus" size={20} />
                </Button>
                <span className="text-2xl font-semibold w-16 text-center">{quantity}</span>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={increaseQuantity}
                >
                  <Icon name="Plus" size={20} />
                </Button>
              </div>
              <Button size="lg" className="flex-1 text-lg py-6">
                <Icon name="ShoppingCart" size={24} className="mr-2" />
                Добавить в корзину
              </Button>
            </div>

            <Button size="lg" variant="secondary" className="w-full text-lg py-6">
              <Icon name="CreditCard" size={24} className="mr-2" />
              Купить в 1 клик
            </Button>

            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Truck" size={24} className="text-accent" />
                  <span>Бесплатная доставка от 10 000 ₽</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={24} className="text-accent" />
                  <span>Гарантия производителя 1 год</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="RotateCcw" size={24} className="text-accent" />
                  <span>Возврат в течение 14 дней</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14">
              <TabsTrigger value="specs" className="text-lg">
                <Icon name="Settings" size={20} className="mr-2" />
                Характеристики
              </TabsTrigger>
              <TabsTrigger value="features" className="text-lg">
                <Icon name="CheckCircle2" size={20} className="mr-2" />
                Особенности
              </TabsTrigger>
              <TabsTrigger value="included" className="text-lg">
                <Icon name="Package" size={20} className="mr-2" />
                Комплектация
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-border pb-3">
                        <span className="text-muted-foreground font-medium">
                          {key === 'caliber' && 'Калибр'}
                          {key === 'capacity' && 'Ёмкость магазина'}
                          {key === 'length' && 'Длина'}
                          {key === 'weight' && 'Вес'}
                          {key === 'power' && 'Мощность'}
                          {key === 'hopup' && 'HOP-UP'}
                          {key === 'material' && 'Материал'}
                          {key === 'fireModes' && 'Режимы огня'}
                        </span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Icon name="Check" size={24} className="text-accent mt-1 flex-shrink-0" />
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="included" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {product.included.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-lg">
                        <Icon name="Package" size={24} className="text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="bg-card/50 border-t border-border py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" size={24} />
                AIRSOFT ARSENAL
              </h3>
              <p className="text-muted-foreground">
                Профессиональное страйкбольное оружие и экипировка
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@airsoft-arsenal.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <p className="text-muted-foreground">
                Пн-Пт: 10:00 - 20:00<br />
                Сб-Вс: 11:00 - 19:00
              </p>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 AIRSOFT ARSENAL. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;

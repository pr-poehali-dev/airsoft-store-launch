import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'АК-12',
      price: 34990,
      category: 'rifles',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/7245349d-0e96-470a-a399-060e94364e3c.jpg',
      inStock: true,
      description: 'Современная российская штурмовая винтовка'
    },
    {
      id: 2,
      name: 'М4А1 Tactical',
      price: 24990,
      category: 'rifles',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/c987d412-29af-4511-9111-3861eab9cee5.jpg',
      inStock: true,
      description: 'Тактическая штурмовая винтовка'
    },
    {
      id: 3,
      name: 'Glock 17 Gen5',
      price: 12990,
      category: 'pistols',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/65cf8b3f-8dc2-4c03-b02e-d9a7199b764b.jpg',
      inStock: true,
      description: 'Пистолет для страйкбола'
    },
    {
      id: 4,
      name: 'AK-74M',
      price: 26990,
      category: 'rifles',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/c987d412-29af-4511-9111-3861eab9cee5.jpg',
      inStock: true,
      description: 'Классика российского оружия'
    },
    {
      id: 5,
      name: 'Desert Eagle',
      price: 15990,
      category: 'pistols',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/65cf8b3f-8dc2-4c03-b02e-d9a7199b764b.jpg',
      inStock: false,
      description: 'Мощный пистолет'
    },
    {
      id: 6,
      name: 'MP5 Submachine',
      price: 21990,
      category: 'rifles',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/c987d412-29af-4511-9111-3861eab9cee5.jpg',
      inStock: true,
      description: 'Компактный пистолет-пулемет'
    },
    {
      id: 7,
      name: 'Beretta M9',
      price: 13990,
      category: 'pistols',
      image: 'https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/65cf8b3f-8dc2-4c03-b02e-d9a7199b764b.jpg',
      inStock: true,
      description: 'Надежный армейский пистолет'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Target" size={32} className="text-accent" />
            <h1 className="text-3xl font-bold tracking-tight">AIRSOFT ARSENAL</h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-accent">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={24} />
                  Корзина
                </SheetTitle>
                <SheetDescription>
                  {cart.length === 0 ? 'Корзина пуста' : `Товаров: ${cart.length}`}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Добавьте товары в корзину</p>
                  </div>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                        <Icon name="ArrowRight" size={20} className="ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://cdn.poehali.dev/projects/4b4a04ee-5149-43a2-93dd-8cafe8ad8dce/files/c19f77c9-68d9-4af1-bed7-ae6ffa4ab6a9.jpg)`
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 text-lg px-4 py-2" variant="outline">
            Профессиональное оружие для страйкбола
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            ТВОЯ ПОБЕДА<br />НАЧИНАЕТСЯ ЗДЕСЬ
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Качественное страйкбольное оружие от ведущих мировых производителей
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Смотреть каталог
            <Icon name="Target" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 mb-8 flex-wrap justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              size="lg"
            >
              <Icon name="Grid3x3" size={20} className="mr-2" />
              Все товары
            </Button>
            <Button
              variant={selectedCategory === 'rifles' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('rifles')}
              size="lg"
            >
              <Icon name="Target" size={20} className="mr-2" />
              Винтовки
            </Button>
            <Button
              variant={selectedCategory === 'pistols' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('pistols')}
              size="lg"
            >
              <Icon name="Crosshair" size={20} className="mr-2" />
              Пистолеты
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale">
                <CardHeader className="p-0">
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => product.id === 1 && navigate('/product/ak12')}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    {!product.inStock && (
                      <Badge className="absolute top-4 right-4" variant="destructive">
                        Нет в наличии
                      </Badge>
                    )}
                    {product.inStock && (
                      <Badge className="absolute top-4 right-4 bg-accent">
                        В наличии
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle 
                    className="mb-2 text-2xl cursor-pointer hover:text-accent transition-colors"
                    onClick={() => product.id === 1 && navigate('/product/ak12')}
                  >
                    {product.name}
                  </CardTitle>
                  <CardDescription className="mb-4">{product.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">{product.price.toLocaleString()} ₽</span>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  {product.id === 1 && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/product/ak12')}
                    >
                      <Icon name="Info" size={20} />
                    </Button>
                  )}
                  <Button
                    className="flex-1"
                    size="lg"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                  >
                    {product.inStock ? (
                      <>
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
                        В корзину
                      </>
                    ) : (
                      'Нет в наличии'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-card/50 border-t border-border py-12">
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

export default Index;
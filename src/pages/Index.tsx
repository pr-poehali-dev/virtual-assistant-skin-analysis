import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | null;

interface SkinAnalysisResult {
  skinType: SkinType;
  hydration: number;
  oilLevel: number;
  sensitivity: number;
  concerns: string[];
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  match: number;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        skinType: 'combination',
        hydration: 65,
        oilLevel: 72,
        sensitivity: 45,
        concerns: ['Расширенные поры', 'Жирный блеск в Т-зоне', 'Обезвоживание']
      });
      setIsAnalyzing(false);
      setActiveTab('results');
    }, 2500);
  };

  const recommendedProducts: Product[] = [
    { id: 1, name: 'Матирующий флюид La Roche-Posay', category: 'Увлажнение', price: '1 890 ₽', match: 95 },
    { id: 2, name: 'Очищающий гель CeraVe', category: 'Очищение', price: '1 299 ₽', match: 92 },
    { id: 3, name: 'Сыворотка с ниацинамидом The Ordinary', category: 'Уход', price: '890 ₽', match: 88 },
    { id: 4, name: 'Тоник для сужения пор Vichy', category: 'Тонизирование', price: '1 450 ₽', match: 85 }
  ];

  const getSkinTypeColor = (type: SkinType) => {
    switch (type) {
      case 'normal': return 'bg-green-500';
      case 'dry': return 'bg-orange-500';
      case 'oily': return 'bg-blue-500';
      case 'combination': return 'bg-accent';
      default: return 'bg-gray-500';
    }
  };

  const getSkinTypeLabel = (type: SkinType) => {
    switch (type) {
      case 'normal': return 'Нормальная';
      case 'dry': return 'Сухая';
      case 'oily': return 'Жирная';
      case 'combination': return 'Комбинированная';
      default: return 'Не определен';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/10">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Sparkles" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Beauty AI
                </h1>
                <p className="text-sm text-muted-foreground">Персональный косметолог</p>
              </div>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-card shadow-sm">
            <TabsTrigger value="home" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="analyze" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Camera" size={18} />
              <span className="hidden sm:inline">Анализ</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={!analysisResult}>
              <Icon name="BarChart3" size={18} />
              <span className="hidden sm:inline">Результаты</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={!analysisResult}>
              <Icon name="ShoppingBag" size={18} />
              <span className="hidden sm:inline">Подбор</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-slide-up">
            <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">Добро пожаловать в Beauty AI</CardTitle>
                <CardDescription className="text-base">
                  Умный ассистент для анализа кожи и персонального подбора косметики
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="ScanFace" className="text-primary" size={32} />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">Анализ кожи</h3>
                      <p className="text-sm text-muted-foreground">
                        Загрузите фото и получите детальный анализ типа кожи
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-accent/20 hover:border-accent/50 transition-all hover:shadow-lg">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Sparkles" className="text-accent" size={32} />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">AI-рекомендации</h3>
                      <p className="text-sm text-muted-foreground">
                        Персональный подбор косметики на основе анализа
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Wand2" className="text-primary" size={32} />
                      </div>
                      <h3 className="font-heading font-semibold text-lg mb-2">AR-примерка</h3>
                      <p className="text-sm text-muted-foreground">
                        Виртуальная примерка макияжа в реальном времени
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg font-heading shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setActiveTab('analyze')}
                >
                  <Icon name="Camera" className="mr-2" size={20} />
                  Начать анализ кожи
                </Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="font-heading">Почему выбирают Beauty AI?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Brain" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Технология машинного обучения</h4>
                    <p className="text-sm text-muted-foreground">
                      Нейросеть анализирует более 50 параметров кожи для точной диагностики
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Target" className="text-accent" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Персонализация</h4>
                    <p className="text-sm text-muted-foreground">
                      Индивидуальные рекомендации с учётом ваших особенностей и предпочтений
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="ShieldCheck" className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Проверенные бренды</h4>
                    <p className="text-sm text-muted-foreground">
                      Только качественная косметика от ведущих производителей
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6 animate-slide-up">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Анализ типа кожи</CardTitle>
                <CardDescription>
                  Загрузите фотографию лица для детального анализа состояния кожи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-primary/30 rounded-2xl p-12 text-center hover:border-primary/60 transition-colors bg-gradient-to-br from-primary/5 to-transparent">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="max-w-xs mx-auto rounded-xl shadow-lg"
                      />
                      {isAnalyzing && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <Icon name="Loader2" className="animate-spin text-primary" size={24} />
                            <span className="text-lg font-medium">Анализируем вашу кожу...</span>
                          </div>
                          <Progress value={75} className="w-64 mx-auto" />
                        </div>
                      )}
                      {!isAnalyzing && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setUploadedImage(null);
                            setAnalysisResult(null);
                          }}
                        >
                          <Icon name="X" className="mr-2" size={16} />
                          Загрузить другое фото
                        </Button>
                      )}
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Icon name="Upload" className="text-primary" size={40} />
                        </div>
                        <div>
                          <p className="text-lg font-semibold mb-2">Нажмите для загрузки фото</p>
                          <p className="text-sm text-muted-foreground">
                            Поддерживаются форматы JPG, PNG до 10 МБ
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                <div className="bg-secondary/50 rounded-xl p-6 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="Info" size={18} className="text-primary" />
                    Рекомендации для точного анализа
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Фотографируйте лицо при естественном освещении</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Убедитесь, что лицо хорошо видно и не закрыто</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Снимите макияж для более точных результатов</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-slide-up">
            {analysisResult && (
              <>
                <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-heading text-2xl">Результаты анализа</CardTitle>
                      <Badge className={`${getSkinTypeColor(analysisResult.skinType)} text-white px-4 py-2 text-sm`}>
                        {getSkinTypeLabel(analysisResult.skinType)}
                      </Badge>
                    </div>
                    <CardDescription>
                      Детальный анализ состояния вашей кожи
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">Увлажнение</span>
                            <span className="text-lg font-bold text-primary">{analysisResult.hydration}%</span>
                          </div>
                          <Progress value={analysisResult.hydration} className="h-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">Жирность</span>
                            <span className="text-lg font-bold text-accent">{analysisResult.oilLevel}%</span>
                          </div>
                          <Progress value={analysisResult.oilLevel} className="h-2" />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">Чувствительность</span>
                            <span className="text-lg font-bold text-primary">{analysisResult.sensitivity}%</span>
                          </div>
                          <Progress value={analysisResult.sensitivity} className="h-2" />
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-heading">Выявленные проблемы</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.concerns.map((concern, index) => (
                            <Badge key={index} variant="outline" className="px-4 py-2">
                              {concern}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Button 
                      size="lg" 
                      className="w-full h-14 text-lg font-heading shadow-lg"
                      onClick={() => setActiveTab('products')}
                    >
                      <Icon name="ShoppingBag" className="mr-2" size={20} />
                      Посмотреть рекомендации
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="products" className="space-y-6 animate-slide-up">
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Персональные рекомендации</CardTitle>
                <CardDescription>
                  Косметика, идеально подходящая для вашего типа кожи
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all border-2 hover:border-primary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name="Sparkles" className="text-primary" size={24} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Совпадение с вашим типом кожи</span>
                              <span className="font-bold text-primary">{product.match}%</span>
                            </div>
                            <Progress value={product.match} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">{product.price}</span>
                            <Button className="gap-2">
                              <Icon name="ShoppingCart" size={18} />
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-accent/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Gift" className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Персональная скидка 15%
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Специальное предложение на рекомендованные продукты при первом заказе
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Icon name="Tag" size={16} />
                      Применить промокод
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
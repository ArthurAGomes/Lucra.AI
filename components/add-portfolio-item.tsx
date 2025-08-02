"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Sparkles } from 'lucide-react';

interface AddPortfolioItemProps {
  onClose: () => void;
  onAdd: (data: any) => void;
}

export function AddPortfolioItem({ onClose, onAdd }: AddPortfolioItemProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const itemData = {
        name,
        symbol: symbol.toUpperCase(),
        quantity: parseFloat(quantity),
        averagePrice: parseFloat(averagePrice),
        currentPrice: parseFloat(currentPrice),
        type,
      };

      await onAdd(itemData);
      
      // Reset form
      setName('');
      setSymbol('');
      setQuantity('');
      setAveragePrice('');
      setCurrentPrice('');
      setType('');
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalValue = () => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(currentPrice) || 0;
    return (qty * price).toFixed(2);
  };

  const calculateChange = () => {
    const avgPrice = parseFloat(averagePrice) || 0;
    const current = parseFloat(currentPrice) || 0;
    if (avgPrice === 0) return 0;
    return ((current - avgPrice) / avgPrice * 100).toFixed(2);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="gradient-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Adicionar Ativo
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do ativo que deseja adicionar ao seu portfólio
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Ativo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Petrobras"
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Símbolo</Label>
              <Input
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Ex: PETR4"
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0.00"
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={type} onValueChange={setType} disabled={loading}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stock">Ação</SelectItem>
                  <SelectItem value="crypto">Criptomoeda</SelectItem>
                  <SelectItem value="bond">Título</SelectItem>
                  <SelectItem value="fund">Fundo</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="averagePrice">Preço Médio</Label>
              <Input
                id="averagePrice"
                type="number"
                step="0.01"
                value={averagePrice}
                onChange={(e) => setAveragePrice(e.target.value)}
                placeholder="0.00"
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPrice">Preço Atual</Label>
              <Input
                id="currentPrice"
                type="number"
                step="0.01"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                placeholder="0.00"
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Preview dos cálculos */}
          {(quantity && currentPrice) && (
            <div className="p-4 rounded-lg bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor Total:</span>
                <span className="font-semibold">
                  R$ {calculateTotalValue()}
                </span>
              </div>
              {(averagePrice && currentPrice) && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Variação:</span>
                  <span className={`font-semibold ${parseFloat(calculateChange()) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {parseFloat(calculateChange()) >= 0 ? '+' : ''}{calculateChange()}%
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 gradient-bg hover:opacity-90 transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adicionando...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
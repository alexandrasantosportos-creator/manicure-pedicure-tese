/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Phone as WhatsApp, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  CreditCard, 
  Clock, 
  ArrowRight,
  Star
} from 'lucide-react';

// --- DATA ---
const CONFIG = {
  identidade_visual: {
    paleta_cores: {
      primaria: "#F5E1DA",
      secundaria: "#E6E6FA",
      acentos: "#D4AF37",
      texto: "#4A4A4A"
    },
    estilo_design: "Minimalista e Luxuoso"
  },
  carrossel_fotos: [
    {
      id: 1,
      url_imagem: "https://spicy-yellow-ktcigexeki.edgeone.app/613130564_25127909276909421_8764350505366926450_n.jpg",
      legenda: "Elegância e sofisticação em cada detalhe",
      tags: ["luxo", "nude", "gold"]
    },
    {
      id: 2,
      url_imagem: "https://accused-orange-uzzgapja8p.edgeone.app/592481290_24837023992664619_4754419660460673957_n.jpg",
      legenda: "Design exclusivo para momentos especiais",
      tags: ["moderno", "sofisticado", "brilho"]
    }
  ],
  informacoes_negocio: {
    nome: "Glow & Gold",
    tagline: "Beleza em cada detalhe",
    endereco: "Rua Exemplo, 123, Bairro, Cidade",
    google_maps_link: "https://www.google.com/maps/place/S%C3%A3o+Paulo,+SP/@-23.6814345,-46.9249728,10z/data=!3m1!4b1!4m6!3m5!1s0x94ce448183a461d1:0x9ba94b08ff335bae!8m2!3d-23.5557714!4d-46.6395571!16zL20vMDIycGZt?authuser=0&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
    whatsapp: "5511999999999"
  },
  agenda_editavel: {
    ano: 2026,
    mes: "Maio",
    meses: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    dias_semana: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    horarios_disponiveis: ["09:00", "10:30", "13:00", "15:00", "17:30"],
    status_feriados: "Sob consulta"
  },
  servicos_produtos: [
    {
      nome: "Manicure Luxo (Folha de Ouro)",
      preco: "120,00",
      tempo_estimado: "1h 30min",
      descricao: "Cutilagem russa, esmaltação em gel e arte exclusiva com folhas de ouro 24k."
    },
    {
      nome: "Blindagem com Arte em Degradê",
      preco: "150,00",
      tempo_estimado: "2h",
      descricao: "Proteção extra para unhas naturais com técnica de gradiente lavanda sofisticado."
    },
    {
      nome: "Alongamento em Fibra de Vidro",
      preco: "250,00",
      tempo_estimado: "3h",
      descricao: "Extensão de alta durabilidade com acabamento natural e hiper-realista."
    }
  ],
  pagamento: {
    metodo: "PIX Online",
    chave_pix: "suachave@email.com",
    link_pagamento_led: "https://link.pagamento/led-servico"
  }
};

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 text-center md:text-left">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-display mb-4 text-[#2D2D2D]"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-accent font-serif italic text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="h-0.5 w-24 bg-accent/30 mt-6 mx-auto md:mx-0" />
  </div>
);

export default function App() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(CONFIG.agenda_editavel.mes);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % CONFIG.carrossel_fotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + CONFIG.carrossel_fotos.length) % CONFIG.carrossel_fotos.length);
  };

  const nextMonth = () => {
    const currentIndex = CONFIG.agenda_editavel.meses.indexOf(currentMonth);
    const nextIndex = (currentIndex + 1) % CONFIG.agenda_editavel.meses.length;
    setCurrentMonth(CONFIG.agenda_editavel.meses[nextIndex]);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const prevMonth = () => {
    const currentIndex = CONFIG.agenda_editavel.meses.indexOf(currentMonth);
    const prevIndex = (currentIndex - 1 + CONFIG.agenda_editavel.meses.length) % CONFIG.agenda_editavel.meses.length;
    setCurrentMonth(CONFIG.agenda_editavel.meses[prevIndex]);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-medium tracking-tighter text-accent">G&G</span>
            <span className="hidden md:block text-sm uppercase tracking-widest font-medium opacity-60">Espaço Manicure</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#agenda" className="hidden md:block text-sm font-medium hover:text-accent transition-colors">Agenda</a>
            <a href="#servicos" className="hidden md:block text-sm font-medium hover:text-accent transition-colors">Serviços</a>
            <button className="luxury-button !py-2 !px-4 md:!px-6 text-xs md:text-sm whitespace-nowrap">Agendar Agora</button>
          </div>
        </div>
      </nav>

      {/* Floating Mobile CTA */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 inset-x-6 z-50 md:hidden"
          >
            <button 
              onClick={() => window.open(`https://wa.me/${CONFIG.informacoes_negocio.whatsapp}`, '_blank')}
              className="luxury-button w-full shadow-2xl flex items-center justify-center gap-3 py-4 text-base"
            >
              <WhatsApp className="w-5 h-5" /> Agendar meu Horário
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <span className="text-accent font-serif italic text-xl mb-4 block">Bem-vinda ao luxo</span>
            <h1 className="text-5xl md:text-8xl font-display leading-[1] md:leading-[0.9] mb-8 text-[#2D2D2D]">
              Onde cada detalhe <br />
              <span className="italic font-light">brilha</span>
            </h1>
            <p className="text-base md:text-lg text-text-main/80 max-w-md mb-10 leading-relaxed mx-auto md:mx-0">
              Especialista em unhas de luxo e arte contemporânea. Unindo técnica impecável à sofisticação das madrepérolas e folhas de ouro.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-4">
              <a href="#agenda" className="luxury-button flex items-center justify-center gap-2">
                Ver Disponibilidade <ArrowRight className="w-4 h-4" />
              </a>
              <a href={CONFIG.informacoes_negocio.google_maps_link} target="_blank" rel="noreferrer" className="secondary-button flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" /> Localização
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden luxury-card">
              <img 
                src={CONFIG.carrossel_fotos[0].url_imagem} 
                alt="Luxury Nails" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs border border-primary/20 hidden md:block">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
              </div>
              <p className="text-sm italic text-text-main font-serif">
                "O acabamento com folha de ouro é simplesmente divino. Experiência única!"
              </p>
              <div className="mt-4 text-xs font-medium uppercase tracking-widest opacity-50">— Mariana Silva</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-24 bg-[#FAF7F5] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Nossa Arte" subtitle="Inspirações e Trabalhos Recentes" />
          
          <div className="relative group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-[16/10] md:aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden luxury-card"
              >
                <img 
                  src={CONFIG.carrossel_fotos[currentPhoto].url_imagem} 
                  alt="Trabalho"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <div className="flex gap-2 mb-4">
                    {CONFIG.carrossel_fotos[currentPhoto].tags.map(tag => (
                      <span key={tag} className="text-[9px] md:text-[10px] uppercase tracking-widest border border-white/40 px-3 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-3xl font-display mb-2 text-white">{CONFIG.carrossel_fotos[currentPhoto].legenda}</h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-6 justify-center md:absolute md:inset-0 md:mt-0 md:pointer-events-none">
              <div className="md:w-full md:max-w-7xl md:mx-auto md:relative md:h-full">
                <button 
                  onClick={prevPhoto}
                  className="p-4 rounded-full bg-white md:bg-white/20 md:backdrop-blur-md text-accent md:text-white border border-primary/20 md:border-white/30 hover:bg-white hover:text-accent transition-all md:pointer-events-auto md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 shadow-lg md:shadow-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextPhoto}
                  className="p-4 rounded-full bg-white md:bg-white/20 md:backdrop-blur-md text-accent md:text-white border border-primary/20 md:border-white/30 hover:bg-white hover:text-accent transition-all md:pointer-events-auto md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 shadow-lg md:shadow-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="servicos" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Serviços & Experiências" subtitle="Menu de Luxo Personalizado" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONFIG.servicos_produtos.map((servico, index) => (
              <motion.div
                key={servico.nome}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card p-10 flex flex-col h-full hover:border-accent/40 transition-colors group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                    <Star className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-display text-accent font-semibold">R$ {servico.preco}</span>
                </div>
                <h3 className="text-2xl font-display mb-4">{servico.nome}</h3>
                <p className="text-text-main/70 text-sm leading-relaxed mb-8 flex-grow">
                  {servico.descricao}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest opacity-60 border-t border-primary/20 pt-6">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {servico.tempo_estimado}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Calendar */}
      <section id="agenda" className="py-24 bg-[#E4E3E0]/20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="luxury-card p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Calendar className="w-64 h-64 text-accent" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
              <SectionTitle title="Agenda Aberta" subtitle={`${currentMonth} ${CONFIG.agenda_editavel.ano}`} />
              <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm self-center md:self-end border border-primary/20 p-2 rounded-full mb-12 md:mb-0">
                <button 
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors text-accent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium uppercase tracking-[0.2em] px-4 w-32 text-center">{currentMonth}</span>
                <button 
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-primary/20 transition-colors text-accent"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {[...Array(6)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={`p-6 rounded-2xl border transition-all text-left ${
                    selectedDay === i 
                      ? 'bg-accent border-accent text-white shadow-lg' 
                      : 'bg-white border-primary/20 hover:border-accent/50 group'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-widest block mb-1 ${selectedDay === i ? 'opacity-80' : 'opacity-40 group-hover:opacity-60'}`}>
                    {CONFIG.agenda_editavel.dias_semana[i % CONFIG.agenda_editavel.dias_semana.length]}
                  </span>
                  <span className="text-xl md:text-2xl font-display font-medium">Dia {15 + i}</span>
                </button>
              ))}
            </div>

            {selectedDay !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="text-sm uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" /> Horários Disponíveis
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-10">
                  {CONFIG.agenda_editavel.horarios_disponiveis.map(h => (
                    <button
                      key={h}
                      onClick={() => setSelectedTime(h)}
                      className={`py-3 rounded-xl text-sm font-medium transition-all ${
                        selectedTime === h
                          ? 'bg-text-main text-white'
                          : 'bg-primary/10 hover:bg-primary/20'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-secondary/20 rounded-2xl border border-secondary/40">
                  <div className="flex-grow">
                    <p className="text-sm font-medium">Feriados e Datas Especiais</p>
                    <p className="text-xs opacity-60 font-serif italic">Status: {CONFIG.agenda_editavel.status_feriados}</p>
                  </div>
                  <button 
                    disabled={!selectedTime}
                    className="luxury-button w-full md:w-auto"
                    onClick={() => window.open(`https://wa.me/${CONFIG.informacoes_negocio.whatsapp}?text=Olá! Gostaria de agendar para o dia ${15 + selectedDay} de ${currentMonth} às ${selectedTime}.`, '_blank')}
                  >
                    Confirmar agendamento
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Payment & Contact */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="luxury-card p-12 bg-white flex flex-col justify-center">
            <h3 className="text-4xl font-display mb-8">Pagamento <span className="text-accent italic">&</span> Facilidade</h3>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center text-secondary">
                  <CreditCard className="w-6 h-6 text-text-main" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{CONFIG.pagamento.metodo}</h4>
                  <p className="text-sm opacity-60 font-mono tracking-tight">{CONFIG.pagamento.chave_pix}</p>
                </div>
              </div>
              <div className="pt-8 border-t border-primary/20">
                <p className="text-sm leading-relaxed opacity-70 mb-6">
                  Para sua comodidade, aceitamos reservas via PIX. Use o botão abaixo para pagamentos rápidos via plataforma segura.
                </p>
                <a href={CONFIG.pagamento.link_pagamento_led} className="secondary-button inline-flex items-center gap-2">
                  Link de Pagamento Seguro <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[3rem] overflow-hidden relative min-h-[400px]">
            <div className="absolute inset-0 bg-accent/10 flex items-center justify-center p-12 text-center flex-col z-10 text-white shadow-inner backdrop-blur-[2px]">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6 shadow-xl">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display mb-4 text-[#2D2D2D]">{CONFIG.informacoes_negocio.nome}</h3>
              <p className="text-[#2D2D2D] mb-8 max-w-sm">{CONFIG.informacoes_negocio.endereco}</p>
              <div className="flex gap-4">
                <a 
                  href={`https://wa.me/${CONFIG.informacoes_negocio.whatsapp}`} 
                  className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <WhatsApp className="w-6 h-6" />
                </a>
                <a href="#" className="bg-[#E4405F] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="absolute inset-0 opacity-40">
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-primary/20 text-center px-6">
        <p className="text-sm font-display uppercase tracking-[0.3em] opacity-40 mb-2">
          {CONFIG.informacoes_negocio.nome}
        </p>
        <p className="text-xs font-serif italic text-accent pb-4">
          {CONFIG.informacoes_negocio.tagline}
        </p>
        <p className="text-[10px] uppercase tracking-widest opacity-30">
          © 2026 Design Minimalista & Luxuoso. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}

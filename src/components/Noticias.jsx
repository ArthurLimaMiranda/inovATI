"use client"
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import { MdTableRows } from 'react-icons/md';
import { HeaderOut } from "@/components/Header";

export function Noticias(){
  // Array de notícias fictícias
  const [news] = useState([
    {
      id: 1,
      title: 'TechX lança edital para o ciclo de inovação 2025',
      date: '2024-12-18',
      description: 'A TechX anunciou hoje o lançamento de um novo edital que busca apoiar startups e pesquisadores no desenvolvimento de soluções tecnológicas voltadas para sustentabilidade. O edital conta com investimento de mais de R$ 10 milhões em projetos que revolucionarão o mercado em 2025.'
    },
    {
      id: 2,
      title: 'Startup GreenFuture vence edital com solução inovadora',
      date: '2024-12-17',
      description: 'A startup GreenFuture impressionou o setor ao vencer um edital de inovação com sua tecnologia revolucionária de captura de carbono em larga escala, prometendo impactar positivamente a sustentabilidade global.'
    },
    {
      id: 3,
      title: 'Edital TechHub 2025 aberto para inscrições',
      date: '2024-12-16',
      description: 'O TechHub lançou seu edital anual com o objetivo de fomentar projetos que utilizem inteligência artificial em aplicações industriais. A previsão é selecionar até 50 equipes com suporte financeiro e mentoria técnica.'
    },
    {
      id: 4,
      title: 'Equipe de pesquisadores revoluciona automação com projeto premiado',
      date: '2024-12-15',
      description: 'Pesquisadores da Universidade GlobalTech venceram o desafio de inovação ao apresentar uma solução de automação que reduz em 40% o tempo de produção em linhas industriais complexas.'
    },
    {
      id: 5,
      title: 'Edital de inovação na saúde é lançado pela HealthX',
      date: '2024-12-14',
      description: 'A HealthX divulgou um edital focado em inovações para diagnóstico médico rápido. Serão selecionados projetos que utilizem machine learning e técnicas de big data para diagnósticos precisos e acessíveis.'
    },
    {
      id: 6,
      title: 'SolutyTech é aprovada em edital com solução para o setor agrícola',
      date: '2024-12-13',
      description: 'A SolutyTech apresentou uma plataforma inovadora baseada em IoT que otimiza o uso de recursos hídricos no setor agrícola, conquistando aprovação em edital governamental.'
    },
    {
      id: 7,
      title: 'OpenInnovation abre edital com foco em startups sustentáveis',
      date: '2024-12-12',
      description: 'O programa OpenInnovation anunciou um edital que visa identificar startups com ideias inovadoras para a gestão de resíduos industriais e domiciliares, oferecendo financiamento integral para as soluções mais criativas.'
    },
    {
      id: 8,
      title: 'Projeto de IA da BrightMind surpreende em edital de tecnologia',
      date: '2024-12-11',
      description: 'BrightMind desenvolveu uma IA responsiva para suporte a clientes que venceu edital de tecnologia, destacando-se pelo uso inovador de redes neurais e NLP.'
    },
    {
      id: 9,
      title: 'SmartCities Lab lança edital focado em mobilidade urbana',
      date: '2024-12-10',
      description: 'O SmartCities Lab divulgou um edital voltado para o desenvolvimento de soluções tecnológicas que melhorem a mobilidade urbana por meio de aplicações de transporte inteligente.'
    },
    {
      id: 10,
      title: 'EnergyMax vence edital com nova tecnologia de armazenamento de energia',
      date: '2024-12-09',
      description: 'A EnergyMax apresentou uma tecnologia avançada para baterias de longa duração, vencendo edital de energia limpa promovido por agências internacionais.'
    },
    {
      id: 11,
      title: 'Startup TechLeap apresenta solução premiada em automação de tarefas',
      date: '2024-12-08',
      description: 'TechLeap venceu edital ao automatizar processos complexos usando algoritmos de aprendizado profundo, reduzindo custos operacionais em até 50%.'
    },
    {
      id: 12,
      title: 'Edital de inovação educacional é lançado por EduTech',
      date: '2024-12-07',
      description: 'A EduTech abriu um edital para projetos que utilizem tecnologia na personalização de ensino, melhorando a experiência de aprendizado.'
    },
    {
      id: 13,
      title: 'EcoTech vence edital com solução de reciclagem automática',
      date: '2024-12-06',
      description: 'A EcoTech apresentou uma máquina inteligente capaz de separar resíduos automaticamente, vencendo edital na área ambiental.'
    },
    {
      id: 14,
      title: 'InovaAgro lança edital com foco na digitalização do campo',
      date: '2024-12-05',
      description: 'O programa InovaAgro abriu inscrições para projetos que digitalizem processos agrícolas, visando maior produtividade e menos desperdício.'
    },
    {
      id: 15,
      title: 'MedTech Solutions revoluciona a telemedicina e vence edital global',
      date: '2024-12-04',
      description: 'A MedTech Solutions apresentou uma solução de telemedicina baseada em IA, tornando o atendimento médico remoto mais eficiente.'
    },
    {
      id: 16,
      title: 'Edital GreenEnergy busca startups com foco em energias renováveis',
      date: '2024-12-03',
      description: 'A GreenEnergy abriu um edital para startups que desenvolvam tecnologias inovadoras na área de energia solar e eólica.'
    },
    {
      id: 17,
      title: 'Edital de IoT para indústria 4.0 é lançado',
      date: '2024-12-02',
      description: 'Empresas e startups têm a chance de apresentar soluções IoT que modernizem linhas de produção industriais.'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState(news);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNews, setSelectedNews] = useState(null);

  // Função de busca
  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = news.filter((item) => item.title.toLowerCase().includes(lowerCaseTerm));
    setFilteredNews(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(searchTerm);
  };

  return (
    <div>
    <HeaderOut fix={true} />
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', marginTop: '50px', backgroundColor: '#EAF7FA', color: '#333' }}>
      {/* Header */}
      <h1 style={{ textAlign: 'center', color: '#007B8F', marginBottom: '20px' }}>Pesquisar Notícias</h1>

      {/* Barra de Pesquisa */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar notícias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: '10px', width: '300px', borderRadius: '10px 0 0 10px', border: '1px solid #B2D8DE' }}
        />
        <button
          onClick={() => handleSearch(searchTerm)}
          style={{ backgroundColor: '#007B8F', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '0 10px 10px 0', cursor: 'pointer' }}
        >
          <FaSearch />
        </button>
      </div>

      {/* Visualização */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button onClick={() => setViewMode('grid')} style={{ marginRight: '10px', cursor: 'pointer' }}>
          <IoGrid size={24} color={viewMode === 'grid' ? '#007B8F' : '#999'} />
        </button>
        <button onClick={() => setViewMode('row')} style={{ cursor: 'pointer' }}>
          <MdTableRows size={24} color={viewMode === 'row' ? '#007B8F' : '#999'} />
        </button>
      </div>

      {/* Lista de Notícias */}
      <div
        style={{
          display: viewMode === 'grid' ? 'grid' : 'block',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNews(item)}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid #B2D8DE',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              marginBottom: viewMode === 'row' ? '10px' : '0',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <h2 style={{ color: '#007B8F' }}>{item.title}</h2>
            <p style={{ color: '#555', marginBottom: '5px' }}>Publicado em: {item.date}</p>
          </div>
        ))}
      </div>

      {/* Pop-up */}
      {selectedNews && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setSelectedNews(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '500px',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: '#007B8F' }}>{selectedNews.title}</h2>
            <p style={{ margin: '10px 0 20px' }}>{selectedNews.description}</p>
            <button
              onClick={() => setSelectedNews(null)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007B8F',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

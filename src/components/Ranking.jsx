"use client";

import React, { useState } from "react";
import { HeaderOut } from "@/components/Header";

const rankings = {
  usuarios: [
    { id: 1, name: "Lucas", score: 15 },
    { id: 2, name: "Ana", score: 14 },
    { id: 3, name: "Carlos", score: 14 },
    { id: 4, name: "Mariana", score: 13 },
    { id: 5, name: "João", score: 13 },
    { id: 6, name: "Beatriz", score: 12 },
    { id: 7, name: "Gabriel", score: 12 },
    { id: 8, name: "Fernanda", score: 11 },
    { id: 9, name: "Pedro", score: 11},
    { id: 10, name: "Alana", score: 10 },
  ],
  equipes: [
    { id: 1, name: "Equipe Alpha", score: 40 },
    { id: 2, name: "Equipe Beta", score: 38 },
    { id: 3, name: "Equipe Delta", score: 36 },
    { id: 4, name: "Equipe Gamma", score: 34},
    { id: 5, name: "Equipe Sigma", score: 32 },
  ],
  empresas: [
    { id: 1, name: "Tech Solutions", score: 10 },
    { id: 2, name: "InovaTech", score: 9 },
    { id: 3, name: "FutureSoft", score: 9},
    { id: 4, name: "Vision Corp", score: 8},
    { id: 5, name: "NextGen", score: 8 },
    { id: 6, name: "Tech Solutions", score: 7},
    { id: 7, name: "InovaTech", score: 7 },
    { id: 8, name: "FutureSoft", score: 7},
    { id: 9, name: "Vision Corp", score: 6},
    { id: 10, name: "NextGen", score: 5},
  ],
};

const columnTitles = {
  usuarios: "Soluções Enviadas",
  equipes: "Pontuação",
  empresas: "Problemas Aprovados",
};

const styles = {
    container: {
      backgroundColor: "#007B8F",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px",
      fontFamily: "Arial, sans-serif",
      color: "#FFFFFF",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      maxWidth: "600px",
      marginBottom: "20px",
    },
    title: {
      fontSize: "36px",
      margin: 0,
      textAlign: "center",
      flex: 1,
    },
    select: {
      marginLeft: "auto",
      padding: "8px 12px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      outline: "none",
      backgroundColor: "#00A2B8",
      color: "#FFFFFF",
      cursor: "pointer",
    },
    tableContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      width: "90%",
      maxWidth: "600px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    headerRow: {
      backgroundColor: "#00A2B8",
      color: "#FFFFFF",
      textAlign: "left",
    },
    headerCell: {
      padding: "12px 16px",
      fontWeight: "bold",
    },
    row: {
      transition: "background-color 0.3s",
    },
    cell: {
      padding: "12px 16px",
      borderBottom: "1px solid #E0E0E0",
      color: "#333333",
    },
  };
  

export function Ranking() {
  const [selectedRanking, setSelectedRanking] = useState("usuarios");

  const handleChange = (e) => {
    setSelectedRanking(e.target.value);
  };

  return (
    <div>
    <HeaderOut fix={true} />
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Ranking</h1>
        
      </div>
      <select style={styles.select} value={selectedRanking} onChange={handleChange}>
          <option value="usuarios">Usuários</option>
          <option value="equipes">Equipes</option>
          <option value="empresas">Empresas</option>
        </select>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headerCell}>Posição</th>
              <th style={styles.headerCell}>Nome</th>
              <th style={styles.headerCell}>{columnTitles[selectedRanking]}</th>
            </tr>
          </thead>
          <tbody>
            {rankings[selectedRanking].map((item, index) => (
              <tr
                key={item.id}
                style={{
                  ...styles.row,
                  backgroundColor: index % 2 === 0 ? "#E5F6F8" : "#FFFFFF",
                }}
              >
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{item.name}</td>
                <td style={styles.cell}>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};


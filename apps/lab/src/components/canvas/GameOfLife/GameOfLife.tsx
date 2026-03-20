import { useEffect, useRef } from "react";

import styles from "./GameOfLife.module.css";

const CELL_SIZE = 4;
const COLOR_CELL = "#ffffff";
const COLOR_BACKGROUND = "#000000";
const INTERVAL = 50;
const PERCENT_OF_LIFE = 0.3;
const HEADER_OFFSET = 60;

const GameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rowCount = Math.floor(
      (window.innerHeight - HEADER_OFFSET - 10) / CELL_SIZE
    );
    const colCount = Math.floor((window.innerWidth - 20) / CELL_SIZE);

    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    canvas.width = CELL_SIZE * colCount;
    canvas.height = CELL_SIZE * rowCount;

    const matrix: boolean[][] = [];
    const matrixTemp: boolean[][] = [];
    for (let i = 0; i < rowCount; i++) {
      matrix[i] = new Array(colCount).fill(false);
      matrixTemp[i] = new Array(colCount).fill(false);
    }

    const fillRandomMatrix = () => {
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          matrix[i][j] = Math.random() < PERCENT_OF_LIFE;
        }
      }
    };

    const getSurroundings = (x: number, y: number) => {
      const prevX = (x - 1 + rowCount) % rowCount;
      const nextX = (x + 1) % rowCount;
      const prevY = (y - 1 + colCount) % colCount;
      const nextY = (y + 1) % colCount;
      const rowPrevX = matrix[prevX];
      const rowX = matrix[x];
      const rowNextX = matrix[nextX];
      let count = 0;
      if (rowPrevX[prevY]) count++;
      if (rowX[prevY]) count++;
      if (rowNextX[prevY]) count++;
      if (rowPrevX[y]) count++;
      if (rowNextX[y]) count++;
      if (rowPrevX[nextY]) count++;
      if (rowX[nextY]) count++;
      if (rowNextX[nextY]) count++;
      return count;
    };

    const changedCells: { row: number; col: number; isAlive: boolean }[] = [];

    const drawLife = () => {
      if (changedCells.length === 0) return;
      const aliveCells: { row: number; col: number }[] = [];
      const deadCells: { row: number; col: number }[] = [];
      for (const { row, col, isAlive } of changedCells) {
        if (isAlive) aliveCells.push({ row, col });
        else deadCells.push({ row, col });
      }
      if (deadCells.length > 0) {
        ctx.fillStyle = COLOR_BACKGROUND;
        for (const { row, col } of deadCells) {
          ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
      if (aliveCells.length > 0) {
        ctx.fillStyle = COLOR_CELL;
        for (const { row, col } of aliveCells) {
          ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
      }
      changedCells.length = 0;
    };

    const drawFullGrid = () => {
      ctx.fillStyle = COLOR_BACKGROUND;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = COLOR_CELL;
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          if (matrix[i][j]) {
            ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    };

    const updateLife = () => {
      for (let i = 0; i < rowCount; i++) {
        matrixTemp[i].fill(false);
      }
      changedCells.length = 0;
      for (let i = 0; i < rowCount; i++) {
        const row = matrix[i];
        const tempRow = matrixTemp[i];
        for (let j = 0; j < colCount; j++) {
          const surroundings = getSurroundings(i, j);
          const currentState = row[j];
          const newState =
            (currentState && (surroundings === 2 || surroundings === 3)) ||
            (!currentState && surroundings === 3);
          tempRow[j] = newState;
          if (currentState !== newState) {
            changedCells.push({ row: i, col: j, isAlive: newState });
          }
        }
      }
      for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
          matrix[i][j] = matrixTemp[i][j];
        }
      }
    };

    fillRandomMatrix();
    drawFullGrid();

    let lastUpdateTime = performance.now();
    let animationId: number;

    const animate = (currentTime: number) => {
      if (currentTime - lastUpdateTime >= INTERVAL) {
        updateLife();
        drawLife();
        lastUpdateTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);

    let canvasLeft = 0;
    let canvasTop = 0;
    const updateCanvasOffset = () => {
      const rect = canvas.getBoundingClientRect();
      canvasLeft = rect.left + (canvas.clientLeft || 0);
      canvasTop = rect.top + (canvas.clientTop || 0);
    };
    updateCanvasOffset();

    const handleMouseMove = (event: MouseEvent) => {
      updateCanvasOffset();
      const colIndex = Math.floor((event.pageX - canvasLeft) / CELL_SIZE);
      const rowIndex = Math.floor((event.pageY - canvasTop) / CELL_SIZE);
      if (
        rowIndex >= 0 &&
        rowIndex < rowCount &&
        colIndex >= 0 &&
        colIndex < colCount &&
        !matrix[rowIndex][colIndex]
      ) {
        matrix[rowIndex][colIndex] = true;
        ctx.fillStyle = COLOR_CELL;
        ctx.fillRect(
          colIndex * CELL_SIZE,
          rowIndex * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove, false);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove, false);
    };
  }, []);

  return (
    <section className={styles.gameOfLifeSection}>
      <canvas ref={canvasRef} className={styles.c} />
    </section>
  );
};

export default GameOfLife;

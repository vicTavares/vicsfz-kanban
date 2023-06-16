//import logo from './logo.svg';
//import { useState } from 'react';
import "./App.css";
import "./stylekanban.css";
import React, { useState, useRef } from "react";
import {
  ArrowLeftCircleFill,
  ArrowRightCircleFill,
  SendPlus,
  Trash2Fill,
  Trash3Fill,
} from "react-bootstrap-icons";
//import { ArrowLeftIcon } from '@radix-ui/react-icons';

function App() {
  //start function App

  const todasColunas = [
    {
      label: "TODO",
      id: 0,
    },
    {
      label: "DOING",
      id: 1,
    },
    {
      label: "REVIEW",
      id: 2,
    },
    {
      label: "DONE",
      id: 3,
    },
  ];

  //STATE

  const [listaTarefas, setListaTarefas] = useState([]);
  const [tarefa, setTarefa] = useState("");

  //REF
  const idTarefa = useRef(0);
  const inputRef = useRef(); // para setfocus para caixa de texto

  //METHODS
  function adicionarTarefa() {
    setListaTarefas([
      ...listaTarefas,
      {
        id: idTarefa.current,
        texto: tarefa,
        status: todasColunas[0].id,
      },
    ]);
    idTarefa.current = idTarefa.current + 1;
    setTarefa("");
  }

  function moverTarefa(idDaTarefa, novoStatus) {
    setListaTarefas(
      listaTarefas.map((tarefa) => {
        if (tarefa.id === idDaTarefa) {
          return { ...tarefa, status: novoStatus };
        }

        return tarefa;
      })
    );
  }

  function limparTarefas() {
    setListaTarefas([]);
    idTarefa.current = 0;
  }

  function removerTarefa(id) {
    setListaTarefas(listaTarefas.filter((tarefa) => tarefa.id !== id));
  }

  const renderizarTarefa = (tarefa) => {
    // para fazer:
    // 1) adicionar efeito de hover: cursor pointer nos botoes
    // 2) ajustar altura dos botóes
    // 3) tirar a caixinha vermelha quando a lista da coluna em questáo for vazia
    // 4) setar text-align left no texto das tarefas
    // 5) ajustar posicionamento dos botóes das tarefas
    // desabilitar add se nao tiver nada na caixa de texto  //https://www.arquivodecodigos.com.br/dicas/3763
    // fixar largura dos cards bzzcv bxv

    return (
      <div className="App-cards">
        <div className="subitem">
          {tarefa.status > todasColunas[0].id && (
            <ArrowLeftCircleFill
              className="App-button-hover"
              color="white"
              onClick={() => {
                moverTarefa(tarefa.id, tarefa.status - 1);
              }}
            />
          )}
          {tarefa.texto}
          {tarefa.status < todasColunas[todasColunas.length - 1].id && (
            <ArrowRightCircleFill
              className="App-button-hover"
              width={30}
              height={30}
              color="grey"
              onClick={() => {
                moverTarefa(tarefa.id, tarefa.status + 1);
              }}
            />
          )}
          {() => {
            removerTarefa(tarefa.id);
          }}
          &nbsp;&nbsp;
          <Trash3Fill color="red" size={25} />
        </div>
      </div>
    );
  };

  return (
    // Start first return of the function App
    <div className="App">
      <header className="App-header">
        <div className="flex-container">
          <div className="flex-item">&nbsp;&nbsp;</div>
          <div className="flex-item">To - Do Manager</div>
          <div className="flex-item">&nbsp;&nbsp;</div>

          <div className="flex-item">
            <input
              ref={inputRef}
              type="text"
              value={tarefa}
              onChange={(evento) => {
                setTarefa(evento.target.value);
              }}
            />
            &nbsp;&nbsp;
            <button disabled={tarefa === ""} onClick={adicionarTarefa}>
              Add <SendPlus size={25} />
            </button>
            &nbsp;&nbsp;
            <button onClick={limparTarefas}>
              Clear <Trash2Fill size={25} />{" "}
            </button>
          </div>
        </div>

        <hr></hr>

        {listaTarefas.length === 0 && <p>Nenhuma tarefa criada ainda</p>}

        <ul className="kanban">
          {todasColunas.map((coluna) => (
            <li className="column">
              {coluna.label}
              <div className="item">
                {listaTarefas
                  .filter((tarefa) => tarefa.status === coluna.id)
                  .map(renderizarTarefa)}
              </div>
            </li>
          ))}
        </ul>
      </header>
    </div>
  ); // End first return
} //start function App

export default App;
//}; //End of export App

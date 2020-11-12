import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';

interface Tarefa {
  id: number;
  descricao: string;
  concluido: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public tarefa : Tarefa = {
    id: new Date().getTime(),
    descricao: "",
    concluido: false,
  };
  public tarefas : Tarefa[] = [];

  constructor(private storage : StorageService) {
    this.storage.carregar("tarefas").then(res => {
      res === null ? this.tarefas = [] : this.tarefas = res
    })
  }

  adicionar() {
    if(this.tarefa.descricao !== ""){
      this.tarefas.push(this.tarefa);
    }
    this.tarefa = {
      id: new Date().getTime(),
      descricao: "",
      concluido: false,
    };

    this.storage.armazenar("tarefas", this.tarefas);
  }

  toggleStatus(id : number) : void {
    const tarefa = this.tarefas.find((tarefa) => {
      return tarefa.id === id;
    });
    tarefa.concluido = !tarefa.concluido;
    this.storage.armazenar("tarefas", this.tarefas);
  }

  excluir(id : number) : void {
    this.tarefas = this.tarefas.filter((tarefa) => {
      return tarefa.id !== id;
    })
    this.storage.armazenar("tarefas", this.tarefas);
  }

}

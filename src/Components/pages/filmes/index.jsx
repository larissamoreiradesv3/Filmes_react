import React, { Component } from 'react';
import Menu from '../../menu';
import Jumbotron from '../../jumbotron';

class Filmes extends Component{
    constructor(){
        super();
        //state ira amarzenar o estado da minha URL
        //Definir os valores do state
        this.state ={
            url       :'https://5f7f4f9bd6aabe00166f0238.mockapi.io/api/filmes',
            id        : '',
            nome      : '',
            categoria : '',
            ano       : '' ,
            filmes    : []
        }
    }
    //metodo para chamar o metodo listar
    componentDidMount(){
        this.listar();
    }
    listar(){
        fetch(this.state.url)
            .then(response => response.json())
            .then(dados => {
                console.log(this.state.filmes);
                //Alterar o valor do state filmes 
            this.setState({filmes : dados});
            })
            .catch(err => console.error(err));
    }
    remover = (event) => {
        event.preventDefault();
            fetch(this.state.url + '/' + event.target.value,{
                method : 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    alert('Filme removido!');
                    this.listar();
                });
        console.log(event.target.value);
    }
    editar(event){
        event.preventDefault();
        fetch(this.state.utl + '/' + event.targed.value, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            this.setState({id            : dado.id});
            this.setState({nome          : dado.nome});
            this.setState({categoria     : dado.categoria});
            this.setState({anoLancamento : dado.anoLancamento});
            
        })
    }
    render(){
        return(
            <div>
                <Menu />
                <Jumbotron titulo= 'Filmes' descricao= 'Gerencie os seus filmes' />
                <div className="container" >               
                <form id="formFilme">
                    <input type="hidden" id="filmeId"/>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form-control" value={this.state.nome} id="nome" placeholder="Informe o Nome" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoria">Categoria</label>
                        <input type="text" className="form-control" value={this.state.nome} id= "categoria" placeholder="Informe a Categoria"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ano">Ano de Lançamento</label>
                        <input type="text" className="form-control small"value={this.state.nome} id="anoLancamento" placeholder="Informe o Ano de Lançamento do Filme"/>
                    </div>
                    <button type="reset" className="btn btn-secondary">Cancelar</button>
                    <button type="button" className="btn btn-success">Salvar</button>
                </form>

                <table className="table" style={{marginTop : '40px'}}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Ano de Lançamento</th>
                            <th scope="col">Ações</th>
                            <th scope="col"> <button type="reset" className="btn btn-primary" >Novo Filme</button> </th>
                        </tr>
                    </thead>
                    <tbody id="tabela-lista-corpo">
                        {
                            this.state.filmes.map((item , index) =>{
                                return(
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.nome}</td>
                                            <td>{item.categoria}</td>
                                            <td>{item.anoLancamento}</td>
                                            <td>
                                                <button type="button" value={item.id} onClick={event => this.remover(event)} className='btn btn-danger'>Remover</button>
                                                <button type="button" value={item.id} onClick={this.editar.bing(this)} className='btn btn-warning'>Editar</button>
                                            </td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

            </div>
                            
        )
    }
}
export default Filmes;

const app = new Vue ({
    el: '#app',
    data:{
        titulo: 'Funcionários',
        tarefas: [],
        tarefa: {
            nome: '',
            email: '',
            senha: '',
            estado: '',
            cidade: '',
            end: {
                rua: '',
                bairro: '',
                numero: ''
            
            },
            tipo: '',
        }
    },
    methods:{
        adicionarTarefas: function(){
            this.tarefas.push(this.tarefa);
            this.tarefa = {
                nome: '',
                email: '',
                senha: '',
                estado: '',
                cidade: '',
                end: {
                rua: '',
                bairro: '',
                numero: ''
            
                },
                tipo: '',
            }
            localStorage.setItem('lista-vue', JSON.stringify(this.tarefas));
        },
        editarTarefa:function(index){
            this.tarefas[index].tipo = true;
            localStorage.setItem('lista-vue', JSON.stringify(this.tarefas));
        },
        excluirTarefas: function(index){
            this.tarefas.splice(index, 1);
            localStorage.setItem('lista-vue', JSON.stringify(this.tarefas));
        }
    },
        created: function(){
            let dadosDB = JSON.parse(localStorage.getItem('lista-vue'));
            if(dadosDB === null){
                this.tarefas = [];
            }else{
                this.tarefas = dadosDB;
            }
        }
});
    
    function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('cidade').value=("");
            document.getElementById('uf').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('cidade').value=(conteudo.localidade);
            document.getElementById('uf').value=(conteudo.uf);
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('cidade').value="...";
                document.getElementById('uf').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };

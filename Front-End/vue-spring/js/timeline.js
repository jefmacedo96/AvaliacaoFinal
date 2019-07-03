

//Variaveis Globais e funções que devem ser recicladas
url = "http://localhost:8080/rest_persistence/api/users";
urlPostagens = "http://localhost:8080/rest_persistence/api/publicacao";
urlComentario = "http://localhost:8080/rest_persistence/api/coments";
var idUsuarioAtivo;

/*Referente as paginas PerfilUsuario, TimeLine e as demais*/
//para o menus da nav;
var varSearch = new Vue({
    el: "#pesquisar",
    data : {
		search : "",
		error:"",
		flag: false,
		listSearch: []
	},
	methods :{
		
		searchPost(){
			this.getSearch();
			this.salveSearch();
			if(this.flag){
				window.location.replace("SearchResult.html");
			}
		},
		getSearch(){
			vm = this;
			vm.error = "";
			  axios.get(urlPostagens+"/search?values="+vm.search
				).then(function (r) {
                
				
                //console.log(r.data);
                if (r.data.publicacao.length > 1) {
                     varPublicacoes.postagens  = r.data.publicacao;
                }else{
                     varPublicacoes.postagens  = r.data;
                }
				
				vm.flag = true;
				varPublicacoes.error = "";
				vm.error = "";
				
				console.log("Postagem pesquisada com sucesso");
				
            }).catch(function (r) {
				vm.error = "Nenhuma postagem ou username encontrada com esse titulo!";
				varPublicacoes.error = vm.error;
				
                console.log(r);
            });
		},
		getUsername(){
			vm = this;
			vm.error = "";
			  axios.get(urlPostagens+"/username?values="+vm.search
				).then(function (r) {
                
				
                //console.log(r.data);
                if (r.data.publicacao.length > 1) {
                     varPublicacoes.postagens  = r.data.publicacao;
                }else{
                     varPublicacoes.postagens  = r.data;
                }
				
				this.flag = true;
				varPublicacoes.error = "";
				this.error = "";
				
				console.log("Postagem pesquisada com sucesso");
				
            }).catch(function (r) {
				vm.error = "Nenhuma postagem encontrada com esse titulo!";
				varPublicacoes.error = vm.error;
				
                console.log(r);
            });
		},
		salveSearch(){
				
			if(this.search != ""){
				
				aux = JSON.parse(localStorage.getItem("search:"));
				if(aux==null){
					localStorage.cont = Number(localStorage.cont)+1;
				}
				auxiliar = JSON.stringify(this.search);
				localStorage.setItem("search:",auxiliar);
				
			}
		},
		resgatarSearch(){
			this.search = JSON.parse(localStorage.getItem("search:"));
			varPublicacoes.result = this.search;
			this.getSearch();
			this.search = "";
		}
	}
});

var menu = new Vue({
    el: "#menuNotificacoes",
    data : {
        notificacoesPorUsuario: [
            {
            notificacao : "Fulanim curtiu seu meme.",
            enderecoNotificacao : "PerfilUsuario.html"
            },
            {
            notificacao : "Ciclanin comentou em seu meme.",
            enderecoNotificacao : ""
            },
            {
            notificacao : "Fulanim curtiu sua foto de perfil.",
            enderecoNotificacao : ""
            },
            {
            notificacao : "Fulanim curtiu seu meme.",
            enderecoNotificacao : ""
            }
        ]        
    },methods :{
        desejaSair(){
            sair = confirm("Deseja sair ?");
            if(sair){
                
                 this.$session.destroy()
                 window.location.replace("index.html");
            }
             
        }
    }
});

//essa variavel é ultilizada por : timeline.html, perfilUsuario e perfilVisitado
var varPublicacoes = new Vue ({
    el : "#publicacoes",
    data : {
        //usuarioAtivo : "",
        postagens : [],
        usuarios : [],
        dadosContaDoUsuario : {//de acordo como esta no BD;
            id : "",
            username: "",
            password: "",
            email:"",
            data:"", //representa data de nascimento
            telefone:"" 
        },
        //uteis para:
        //Comentarios
        comentariosRecebidos : [],
        fotoUsuarioComentou :"",
        quemComentou:"",

        //publicacoes ou postagens
        imgMeme: "" ,
        fotoUsuarioPost : [], // resolver esse problema
        comentario : "",
        timeLine : [],/*É um array de Objetos, onde cada indice é um usuario diferente*/
        postUsuarioEsp : "",

        incentivaPostagem : "Não compartilhe nudes, compartilhe memes.",
        enderecoImg : "",
        messagemPost:"",
        error:"",
        //usuario
        fotoPerfilUsuario : "",
        memesPostados: 0,
        curtiuAfoto : false,
        quantLikes: 0,
        
        //
        perfilVisitado : "",

        perfilVisitadoDescricao : "",
        //perfilVisitadoMemesPostados : "",
        valorCampoTexto : "",
        
        auxilirPublicacao: "",
        flagSair: false,
        flagLogin: true,
		
		search: "",
		result:""
        
    },
    methods: {
		searchPost(){
			
			varSearch.search = this.search;
			if(document.getElementById("username").checked==false && 
			document.getElementById("post").checked==false ) {
				this.error = "Selecione uma opcao de busca!!!";
			}
			else if(document.getElementById("username").checked==true ) {
				//alert( "buscando por usuario." );
				varSearch.getUsername();
				this.result = varSearch.search;
			}else {
				varSearch.searchPost();
				this.result = varSearch.search;
			}
			
		},
        existeSession(){
            // A funcao "created" bugou tudo, entao decedi colocar assim
            if (!this.$session.exists()) {
                //as variaveis abaixo nao estao sendo usadas
                this.flagSair = true;
                this.flagLogin = false;
                //caso não exista uma sessão, voltar para a pagina login
                window.location.replace("index.html");
            }
            //como usar o "this.$session.id()"??
            key = JSON.parse(localStorage.getItem("vue-session-key") );
            id = key.id;

            this.getIdUsers(id);
            
        },
        /**Inserindo uma nova postagem em um array */
        getIdUsers(id){
            vm = this;
            axios.get( url+"/"+id).then( function (r) {
                  vm.dadosContaDoUsuario = r.data;
                
                console.log(r.data);
                }).catch(function (error) {
                console.log(error);
            });
            //esta definindo a imagem de perfil
            vm.fotoPerfilUsuario = "uploads/"+id+"user?"+new Date().getTime();
            vm.idUsuarioAtivo = id;
        },
        getUsers(){
            vm = this;
            axios.get(url).then(function (r) {
                if(r.data.user.length > 1) {
                    vm.usuarios = r.data.user;    
                } else {
                    vm.usuarios = r.data;
                }
                console.log(r.data);
                
                }).catch(function (error) {
                alert.console("Erro ao consultar os usuarios no banco!!!");
                console.log(error);
            });
        },
        //esse metodo ira retornar um objeto que se encontra em uma determinada possicao de um vetor
        filtrandoUsuario(nameUser){
            vm = this;
            //vm.getUsers();//preenchendo o vetor 
            
            for (index = 0; index < vm.usuarios.length; index++) {
                if(vm.usuarios[index].username  == nameUser){
                    //console.log("usuario encontrado:"+vm.usuarios[index].username);
                    return vm.usuarios[index];
                }
            }
            return null;
        },
        postPostagens(post){
            vm = this;

            idUser = vm.dadosContaDoUsuario.id;//id do usuario que postou
            texto = post.postPublicacaoTexto;    
            like = post.quantidadesLikes;
            username = post.quemPostou;

            let formData = new FormData();
			
            formData.append('image', vm.imgMeme);
            formData.append('texto', texto);
            formData.append('like', like);
            formData.append('idUsers', idUser);
            formData.append('username', username); 
            //console.log(username);
            axios.post( urlPostagens, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then( function (r) {
                console.log(r.data);
             
                    //alert(r.data);
                }).catch( function (error) {
                console.log(error);
                    console.alert(r.data);
            });
            console.log("Postagem inserida com sucesso");
        },
        handleFileUpload() {
            this.imgMeme = this.$refs.file.files[0];                        
        },
        getPostagens(){
            vm = this;
            axios.get(urlPostagens).then(function (r) {
                console.log("Get Postagens");
                console.log(r.data);
                if (r.data.publicacao.length > 1) {
                    vm.postagens = r.data.publicacao;
                }else{
                    vm.postagens = r.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        getPostagensIdUser(id){
            vm = this;
            axios.get(urlPostagens+"/"+id).then(function (r) {
                console.log("Get Postagens Id User");
                console.log(r.data);

                if (r.data.publicacao.length > 1) {
                    vm.postagens = r.data.publicacao;
                    vm.postUsuarioEsp = r.data.publicacao[0];
                }else{
                    vm.postagens = r.data;
                    vm.postUsuarioEsp = r.data;
                }
               
                
            }).catch(function (error) {
                console.log(error);
            });
        },
        putPostagens(postAlterado){
            
            idUser = this.dadosContaDoUsuario.id;//id do usuario que postou
            texto = post.postPublicacaoTexto;    
            like = quantidadesLikes;
            username = postAlterado.username;

            let formData = new FormData();
            formData.append('image', vm.imgMeme);
            formData.append('texto', texto);
            formData.append('like', like);
            formData.append('idUsers', idUser);//ve com o frachesco
            formData.append('username', username);
            console.alert(username);
            axios.put(urlPostagens + "/" + postAlterado.id,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                
                ).then( function (r) {
                console.log(r.data);
                }).catch( function (error) {
                console.log(error);
            });
            console.log("Postagem alterada com sucesso");
        },
        postComentario(coment, idPost){
            vm = this;
            
            idUser = vm.dadosContaDoUsuario.id;//id do usuario que postou
            comentario = coment;    
            idPostagem = idPost;
            
            let formData = new FormData();
            formData.append('comentario', comentario);
            formData.append('idUser', idUser);
            formData.append('idPostagem', idPostagem);
                
            axios.post( urlComentario, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then( function (r) {
                console.log(r.data);
                }).catch( function (error) {
                console.log(error);
            });
            console.log("Comentario inserido com sucesso");
        },
        putComentario(idComent, coment, idPost){
            vm = this;
            
            idUser = vm.dadosContaDoUsuario.id;//id do usuario que postou
            comentario = coment;    
            idPostagem = idPost;
            
            let formData = new FormData();
            formData.append('comentario', comentario);
            formData.append('idUser', idUser);
            formData.append('idPostagem', idPostagem);
                
            axios.put( urlComentario + "/" + idComent,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then( function (r) {
                console.log(r.data);
                }).catch( function (error) {
                console.log(error);
            });
            console.log("Comentario inserido com sucesso");
        },
        getComentarios(){
            vm = this;
            axios.get(urlComentario).then(function (r) {
                console.log(r.data);
                vm.comentariosRecebidos = r.data;
                }).catch(function (error) {
                console.log(error);
            });
        },
        preechendoTimeline(){
            /*
            var obj;
          
            index = this.postagens.length - 1;

            //if(index > 20) index = 20;//limitando o numero de postagem
           
            for (valor = 0; index >= 0 ; index--,valor++) {
                
               // j = Math.floor(Math.random() * (localStorage.cont));//acessar aleotariamente uma postagem
                
                obj = this.postagens[index];
                if( valor > 10) {
                    return true;
                }
                if(obj != null){
                    
                    this.timeLine[valor] = obj;
                    //this.fotoUsuarioPost[valor] = "uploads/"+id+"user?"+new Date().getTime();

                }
                
                console.log("dados=> index: "+index+", valor:"+valor);
            } 
            //console.log("valor de postages:"+this.postagens);
            return true;
            */
        },
        filtrandoPostagem(){

           
            if(this.postagens != null){
                
                this.memesPostados = this.postagens.length;
                
                return true;
            }
            return false;
         
        },
        quemEstarSendoVisitado(perfilASerVisitado){
            this.perfilVisitado = perfilASerVisitado;
			
            salvarEnderecoVisitado() ;
			//this.perfilVisitado = "PerfilUsuario.html";
            if(perfilASerVisitado == this.dadosContaDoUsuario.id){
                this.perfilVisitado = "PerfilUsuario.html";
				//window.location.replace("PerfilUsuario.html");
			}
			else{
				this.perfilVisitado = "PerfilVisitado.html";
			  //window.location.replace("PerfilVisitado.html");
			}

        },
        trocarIconeDeCurtir(userPostImg, fotoQueRecebeuCom){
            if(userPostImg != "" && fotoQueRecebeuCom != ""){
                likes = 0;
                if(this.curtiuAfoto) {
                    this.curtiuAfoto = false;
                    likes = -1;
                }else{
                    this.curtiuAfoto = true;
                    likes = 1;
                }
                /* esse trexo de codigo deveria "atualizar" a quantidade de curtida de uma respectiva postagem
                posicao = 0;
                for (index = 0; index < this.timeLine.length; index++) {
                
                    if(this.timeLine[index].nomeUsuarioPost == userPostImg && this.timeLine[index].memePorPostagem == fotoQueRecebeuCom){
                        this.timeLine[index].quantidadesLikes += likes;
                        posicao = index;
                        //alert("Esta inserindo no indice "+index+", onde o nome do usuario é: "+this.timeLine[index].nomeUsuarioPost);
                    }
                    
                }
                auxiliar = JSON.stringify(varPublicacoes.timeLine[posicao]);
                localStorage.setItem("postagem "+(localStorage.cont - posicao),auxiliar);
                */
                
            }
        },
        adicionarComentario(comentario, idPostagem){
            
            if(comentario != ""){
                /**Ha duas possibilidades ao adicionar um comentario
                 * 1 - a publicacao nunca recebeu um comentario, - è valido APENAS se FOSSE para Atualizar 
                 * 2 - ja existe comentarios na postagem
                 *
                for (index = 0; index < this.comentariosRecebidos.length; index++) {
                    if(idPostagem == this.comentariosRecebidos[index].idPostagem){
                        this.putComentario(this.comentariosRecebidos[index].id, comentario, idPostagem); 
                        return;
                    }
                }*/
                this.postComentario(comentario, idPostagem); 
               this.comentario = "";
               // RecarregarPagina();
            }
            else {
                alert("Campo comentario esta em branco.");
                
            }
            //RecarregarPagina();
        }
    }
});

function loadingUser(){
    
   varPublicacoes.existeSession();
   
   id = resgatarEnderecoVisitado();//retorna o id do usuario que deve ser carregada a pagina
   varPublicacoes.getPostagensIdUser(id);
   varPublicacoes.perfilVisitado = id;

   varPublicacoes.getComentarios();
}
/*Descrição: essa função tem como objetivo resgatar no LS o id (que foi armazenado previamente)
 do usuario que acabou de logar.
 */
 
 
function quemEstarSendoVisitado(){
	varPublicacoes.quemEstarSendoVisitado(varPublicacoes.dadosContaDoUsuario.id);
}
function qualUsuarioAtivo(){
   varPublicacoes.existeSession();
   varPublicacoes.getPostagens();
   varPublicacoes.getComentarios();
}
function whatSearchActive(){
   varPublicacoes.existeSession();
   varSearch.resgatarSearch();//pega as postagens com determinda pesquisa
 
   varPublicacoes.getComentarios();
}
function resgatarEnderecoVisitado(){
    return JSON.parse(localStorage.getItem("id perfil Visitado:"));
}
//descrição: essa função salva no local Storage qual o perfil que deverá ser visitado(dependendo da situação)
function salvarEnderecoVisitado(){
    
    if(varPublicacoes.perfilVisitado != ""){

        aux = JSON.parse(localStorage.getItem("id perfil Visitado:"));
        if(aux==null){
            localStorage.cont = Number(localStorage.cont)+1;
        }
        auxiliar = JSON.stringify(varPublicacoes.perfilVisitado);
        localStorage.setItem("id perfil Visitado:",auxiliar);
        
    }
}

function alterPassword(){
	  window.location.replace("alterPassword.html");
 }
/*descricao: possui a funcao de inserir no banco uma nova postagem
 e adicionando comentario a uma postagem especifica*/
 
 //sabe-se que apartir de atualização (AJAX), as postagens serão reconhecidas por ID (ou deverião ser)
function adicionarAtualizarPostagem(){
   vm = varPublicacoes;
    texto = vm.messagemPost;
    endImg = vm.enderecoImg;
    
    vm.error = "";

    if(texto == ""){
        vm.error = "O campo texto esta vazio!";
    }
    else if (endImg == ""){
        vm.error = "Não ha uma imagem selecionada!";
    }else{
        
        /**O comando UNSHIFT inseri no começo do array*/
        auxiliar = {
            idUser :  vm.dadosContaDoUsuario.id,
            postPublicacaoTexto : texto,
            quantidadesLikes : 0,
            quemPostou: vm.dadosContaDoUsuario.username        
        }

        //vm.timeLine.unshift(auxiliar);

        vm.postPostagens(auxiliar);
        //vm.getPostagens();
        

        vm.messagemPost = "";
        vm.enderecoImg = "";
        RecarregarPagina();
    }
}

function RecarregarPagina(){
    window.location.reload();
}


//Para realizar o login na pagina Login.html
//função ultrapassada
function verificarSeEstaCadastrado(usuario){
    
    aux = localStorage.getItem("pa:usuarios");
    valor = [];
    
    if(aux != null){
        obj = JSON.parse(aux);
        for (index = 0; index < obj.length; index++) {
            if(usuario == obj[index].username){
                valor = obj[index];
            }            
        }
        return valor;
    }
    return null;
}
function deleteCont(){
	 
	var altera = confirm("Deseja Apagar sua conta? Esse processo é irreversivel! ?");
	if(altera == true){
		 key = JSON.parse(localStorage.getItem("vue-session-key") );
         id = key.id;
		 //por motivo de segurança, sera deletado o usuario que possue secao, ou seja id na session 
		 axios.delete(this.url + "/" + id).then(function (r) {
						console.log(r);
						alert("Conta deletada!");
						this.$session.destroy();
						window.location.replace("index.html");
					}).catch(function (error) {
						console.log(error);
						alert("Erro ao deletar a conta do usuario");
					});

		
	}
	

}

var loga = new Vue({
    el : "#login",
    data : {
        urlLogin : "http://localhost:8080/rest_persistence/login",
        username : "",
        password:"",
		confSen : "",
        liberandoAcesso : "#",
        usuarios : [],
        error: ""
    },
    methods: {
	
        perfilVisitado(){

            if(localStorage.getItem("id perfil Visitado:") == null){
                localStorage.cont = Number(localStorage.cont) + 1;
            }
            
            perfil = JSON.stringify("");
            localStorage.setItem("id perfil Visitado:", perfil);
   
        },
         entrar(){
                vm = this;
                if(vm.username == "" || vm.password == "") {
                   this.error = "Usuario ou senha estão vazios!!!";
                }else{
                    vm.error = "Aguarde, autenticando o username e a senha!";
                    axios.defaults.withCredentials = true;
                    axios.post(this.urlLogin, {
                        username: vm.username,
                        password: vm.password
                    }).then(function (r) {
                        if (r.status == 200) {
                            vm.$session.start();
                            vm.$session.set("id",r.data);
                            console.log(r.data);
                            vm.perfilVisitado();
                            //alert("os dados estão corretos!!!");
                            window.location.replace("TimeLine.html");
                        } 
                    }).catch(function (error) {
                        if(error.status == 400){
                            vm.error = "Usuario ou senha estão incorretos !!";
                        }else{
                            vm.error = "Não foi possível logar !!";
                        }
                        console.log(error);
                       
                    });
				}
		 },
		 voltar(){
			 window.location.replace("conf.html");
		 },
         alterSenhas(){
			vm = this;
			if(vm.confSen == "" || vm.password == "") {
			   this.error = "Ha campos vazios!!!";
			}else if(vm.confSen !=  vm.password ){
				this.error = "Senhas não são iguais";
			}
			else{
				vm = this;
				
				let formData = new FormData();
				
				key = JSON.parse(localStorage.getItem("vue-session-key") );
				id = key.id;
				
				formData.append('password', vm.password);
				
				axios.put(url+"/"+id, formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}).then(function (r) {
					
					console.log(r.data);
					
					if(r.status == 200){
						console.log("senha alterada com sucesso");
						 window.location.replace("conf.html");
					}
					
				}).catch(function (err) {
					console.log(err);
				});
			}
		 }//feicha o put
		}
	//fim de methods
});


function redirecionamentoAlterSenha(){
	 window.location.replace("alterPassword.html");
 }

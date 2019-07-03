

function cadastrarUsuarios(){
    
    /**
     * 
nome Usuario, email, data nascimento, telefone e senha(cadastro)
foto + frase de efeito + memesPostados
     */
    usuarios = [
            {
            nomeUsuario :  "" ,
            senhaUsuario : "",
            emailUsuario : "",
            dataNascUsuario : "",
            telefoneUsuario : "",
            fotoPerfilUsuario : "",
            descricaoUsuario : "",
            memesPostados: 0          
            }
        ];
        
    
    auxiliar = JSON.stringify(usuarios);
    localStorage.setItem("pa:usuarios cadastrados:",auxiliar);
    
}
function recuperarDados(usuario){
    obj = localStorage.getItem("pa:usuarios cadastrados:");
    if(obj != null){
        for (index = 0; index < obj.length; index++) {
            if(usuario == obj.nomeUsuario){
                valor = array[index];
            }
            
        }
        return valor;
    }
    return null;
}
/*
<input type="text"  class="form-control" name="Usuario" placeholder="Usuario" id="usuarioL"><br>

<label class="sr-only" for="senha">Senha</label>
<input type="password" class="form-control" name="Senha"  placeholder="Senha" id="senhaL"><br>
*/
function validar(){
    user = document.getElementById('usuarioL').value;
    senha = document.getElementById('senhaL').value;

    if(user != "" && senha != ""){
        
        obj = recuperarDados(user);

        if(obj.senhaUsuario == senha){
                    
            auxiliar = JSON.stringify(user);
            localStorage.setItem("pa:Usuario Ativo:",auxiliar);
        }
    }else{
        alert("Usuario ou senha esta vazia!");
    }
}
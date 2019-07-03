package jeff.web.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
 
@Entity
public class Funcionario {
   
    @Id
    @GeneratedValue
    private Integer id;
    @Column(columnDefinition="text")
    private String nome;
    @Column(columnDefinition="text")
    private String cargo;
    @Column(columnDefinition="text")
    private String nascimento;
    @Column(columnDefinition="text")
    private String entrada;
   

	public Funcionario() {
       
    }
       
    public Funcionario(Integer id, String nome, String cargo, String nascimento, String entrada) {
        super();
        this.id = id;
        this.nome = nome;
        this.cargo = cargo;
        this.nascimento = nascimento;
        this.entrada = entrada;
    }
   
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getNascimento() {
        return nascimento;
    }
    public void setNascimento(String nascimento) {
        this.nascimento = nascimento;
    }
    public String getEntrada() {
        return entrada;
    }
    public void setEntrada(String entrada) {
        this.entrada = entrada;
    }
    @Override
 	public String toString() {
 		return "Funcionario [id=" + id + ", nome=" + nome + ", cargo=" + cargo + ", nascimento=" + nascimento
 				+ ", entrada=" + entrada + "]";
 	} 
 
}

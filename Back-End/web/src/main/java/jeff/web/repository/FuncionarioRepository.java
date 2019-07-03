package jeff.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jeff.web.model.Funcionario;

	public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
		@Query("from Funcionario where nome = ?1")
		Funcionario findByNome(String nome);
	}
	
	


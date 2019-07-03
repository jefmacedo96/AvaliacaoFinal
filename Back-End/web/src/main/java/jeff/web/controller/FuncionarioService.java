package jeff.web.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jeff.web.model.Funcionario;
import jeff.web.repository.FuncionarioRepository;

@RestController
@RequestMapping(path = "/api/cursos")
@CrossOrigin
public class FuncionarioService {
	@Autowired
	private FuncionarioRepository cursos;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Funcionario>> getCursos() {
		return new ResponseEntity<List<Funcionario>>(
				cursos.findAll(new Sort(Sort.Direction.ASC, "id")), HttpStatus.OK);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public ResponseEntity<Funcionario> getCurso(@PathVariable("id") Integer id) {
		Optional<Funcionario> funcionario = cursos.findById(id);
		if (funcionario.isPresent()) {
			return new ResponseEntity<Funcionario>(funcionario.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ResponseEntity<Funcionario> getCurso(@RequestParam("nome") String nome) {
		Funcionario funcionario = cursos.findByNome(nome);
		if (funcionario != null) {
			return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Funcionario> addCurso(String nome, String cargo, String nascimento, String entrada) {
		if (nome == null || cargo == null || nascimento == null || entrada == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Funcionario funcionario = new Funcionario(null, nome, cargo, entrada, nascimento);
		return new ResponseEntity<Funcionario>(funcionario, HttpStatus.OK);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	public ResponseEntity<Funcionario> atualizarCurso(@PathVariable("id") int id, String nome, String cargo, String nascimento, String entrada) {
		if (nome == null || cargo == null || nascimento == null || entrada == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		Optional<Funcionario> funcionario = cursos.findById(id);
		if (funcionario.isPresent()) {
			funcionario.get().setNome(nome);
			funcionario.get().setCargo(cargo);
			funcionario.get().setNascimento(nascimento);
			funcionario.get().setEntrada(entrada);
			cursos.save(funcionario.get());
			
			return new ResponseEntity<Funcionario>(funcionario.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deletarCurso(@PathVariable("id") int id) {
		if (cursos.existsById(id)) {
			cursos.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
}



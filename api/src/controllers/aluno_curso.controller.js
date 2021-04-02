const db = require('../config/database');


// ==> Método responsável por criar um novo curso
exports.createAlunoCurso = async(req, res) => {
    const { codigo_curso, codigo_aluno } = req.body;
    try {
        const { rows} = await db.query(
            "INSERT INTO curso_aluno (codigo_curso, codigo_aluno) VALUES ($1, $2)",
            [codigo_curso, codigo_aluno]
        );

        res.status(200).send({
            message: 'Relação criada com sucesso!',
            body: {
                curso: { codigo_curso, codigo_aluno }
            }
        });
    } catch (error) {
            console.error('createAlunoCurso', error);
            res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// ==> Método responsável por listar todos os cursos do aluno
exports.listAllCursosByAluno = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await db.query(`select a.alunonome, c.cursodescricao, c.ementa
      from curso_aluno ca 
      inner join
          aluno a on a.alunoid = ca.codigo_aluno
      inner join
          curso c on c.cursoid = ca.codigo_curso
        where ca.codigo_aluno = $1`, 
        [id]
        );
      if (!rows.length) {
        throw 'aluno_not_found';
      }
      res.status(200).send(rows);
    } catch (error) {
      console.error('listAllCursosByAluno', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };

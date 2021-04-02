const db = require('../config/database');


//cria Aluno
exports.createAluno = async(req, res) => {
    const { alunonome } = req.body;
    try {
        const { rows} = await db.query(
            "INSERT INTO aluno (alunonome) VALUES ($1)",
            [alunonome]
        );

        res.status(200).send({
            message: 'Aluno adicionado com sucesso!',
            body: {
                curso: { alunonome }
            }
        });
    } catch (error) {
            console.error('createAluno', error);
            res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// ==> Método responsável por listar todos os Aluno:
exports.listAllAlunos = async (req, res) => {
    try {
      const { rows } = await db.query(`SELECT 
                                        alunoid,
                                        alunonome
                                      FROM aluno ORDER BY alunonome asc`);
      res.status(200).send(rows);
    } catch (error) {
      console.error('listAllAlunos', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };
  
  // ==> Método responsável por listar um determinado 'Aluno' por Id:
  exports.findAlunoById = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await db.query(`SELECT 
                                        alunoid,
                                        alunonome
                                      FROM aluno WHERE alunoid = $1`,
        [id]
      );
      if (!rows.length) {
        throw 'aluno_not_found';
      }
      res.status(200).send(rows[0]);
    } catch (error) {
      console.error('findAlunoById', error);
      if (error == 'aluno_not_found') {
        res.status(404).send({
          message: "Aluno not found."
        });
      } else {
        res.status(500).send({
          message: "Ocorreu um erro."
        });
      }
    }
  };
  
  // ==> Método responsável por atualizar um determinado 'Aluno' por Id:
  exports.updateAlunoById = async (req, res) => {
    const { id } = req.params;
    try {
      const { alunonome } = req.body;
      const { rows } = await db.query(`UPDATE aluno 
                                      SET alunonome = $1
                                      WHERE alunoid = $2`,
        [alunonome, id]
      );
      res.status(200).send({ message: "Aluno Updated Successfully!" });
    } catch (error) {
      console.error('updateAlunoById', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };
  
  // ==> Método responsável por deletar um determinado 'Aluno' por Id:
  exports.deleteAlunoById = async (req, res) => {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM aluno WHERE alunoid = $1", [id]);
      res.status(200).send({ message: "Aluno deleted successfully!" });
    } catch (error) {
      console.error('deleteAlunoById', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };
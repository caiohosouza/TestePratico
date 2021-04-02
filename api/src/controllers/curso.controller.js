const db = require('../config/database');


//cria curso
exports.createCurso = async(req, res) => {
    const { cursodescricao, ementa} = req.body;
    try {
        const { rows} = await db.query(
            "INSERT INTO curso (cursodescricao, ementa) VALUES ($1, $2)",
            [cursodescricao, ementa]
        );

        res.status(201).send({
            message: 'Curso adicionado com sucesso!',
            body: {
                curso: { cursodescricao, ementa}
            }
        });
    } catch (error) {
            console.error('createCurso', error);
            res.status(500).send({
            message: "Ocorreu um erro."
        });
    }
};

// ==> Método responsável por listar todos os Curso:
exports.listAllCursos = async (req, res) => {
    try {
      const { rows } = await db.query(`SELECT 
                                        cursoid,
                                        cursodescricao,
                                        ementa
                                      FROM curso ORDER BY cursodescricao asc`);
      res.status(200).send(rows);
    } catch (error) {
      console.error('listAllCursos', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };
  
  // ==> Método responsável por listar um determinado 'Curso' por Id:
  exports.findCursoById = async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await db.query(`SELECT 
                                        cursoid,
                                        cursodescricao,
                                        ementa
                                      FROM curso WHERE cursoid = $1`,
        [id]
      );
      if (!rows.length) {
        throw 'curso_not_found';
      }
      res.status(200).send(rows[0]);
    } catch (error) {
      console.error('findCursoById', error);
      if (error == 'curso_not_found') {
        res.status(404).send({
          message: "Curso not found."
        });
      } else {
        res.status(500).send({
          message: "Ocorreu um erro."
        });
      }
    }
  };
  
  // ==> Método responsável por atualizar um determinado 'Curso' por Id:
  exports.updateCursoById = async (req, res) => {
    const { id } = req.params;
    try {
      const { cursodescricao, ementa } = req.body;
      const { rows } = await db.query(`UPDATE curso 
                                      SET cursodescricao = $1,
                                          ementa = $2  
                                      WHERE cursoid = $3`,
        [cursodescricao, ementa, id]
      );
      res.status(200).send({ message: "Curso Updated Successfully!" });
    } catch (error) {
      console.error('updateCursoById', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };
  
  // ==> Método responsável por deletar um determinado 'Curso' por Id:
  exports.deleteCursoById = async (req, res) => {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM curso WHERE cursoid = $1", [id]);
      res.status(200).send({ message: "Curso deleted successfully!" });
    } catch (error) {
      console.error('deleteCursoById', error);
      res.status(500).send({
        message: "Ocorreu um erro."
      });
    }
  };

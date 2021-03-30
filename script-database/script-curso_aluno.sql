Create Table Curso_Aluno(
	CurAlunID INT GENERATED ALWAYS AS IDENTITY,
	Codigo_Curso INT NOT NULL,
	Codigo_Aluno INT NOT NULL,
	CONSTRAINT fk_Curso FOREIGN KEY(Codigo_Curso) REFERENCES Curso(CursoID),
	CONSTRAINT fk_Aluno FOREIGN KEY(Codigo_Aluno) REFERENCES Aluno(AlunoID)
);
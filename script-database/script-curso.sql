Create Table Curso(
	CursoID INT GENERATED ALWAYS AS IDENTITY,
	CursoDescricao varchar(50) NOT NULL,
	Ementa text,
	PRIMARY KEY(CursoID)
);
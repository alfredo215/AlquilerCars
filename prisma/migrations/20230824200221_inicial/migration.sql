-- CreateTable
CREATE TABLE "Usuarios" (
    "usuarioId" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "pass" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Renta" (
    "rentaId" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "dui" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "carro_modelo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "usuarioId_FK" INTEGER NOT NULL,

    CONSTRAINT "Renta_pkey" PRIMARY KEY ("rentaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Renta_dui_key" ON "Renta"("dui");

-- CreateIndex
CREATE UNIQUE INDEX "Renta_placa_key" ON "Renta"("placa");

-- AddForeignKey
ALTER TABLE "Renta" ADD CONSTRAINT "Renta_usuarioId_FK_fkey" FOREIGN KEY ("usuarioId_FK") REFERENCES "Usuarios"("usuarioId") ON DELETE RESTRICT ON UPDATE CASCADE;

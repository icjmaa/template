# Librería Template para angular versión 11.x.x

Librería para el equipo de desarrollo i4b

## ¿Como compilar?

Ejecute el siguiente comando dentro de su proyecto

`npm run build-lib`

Produce el siguiente directorio `dist/template`.

## Nomenclatura para definir el versionado.
	
	[versión de la rama]+angular-11.x.x(versión mínima de angular)

	[version de la rama]:
	v1.0.x - Patch "Se introducen corrección de errores,compatibles con versiones anteriores"
	v1.x.0 - Minor "Debe ser incrementada si se introduce funcionalidad nueva y compatible con la versión anterior. Este puede incluir cambios a nivel de parches. La versión parche debe reiniciarse a 0"
	vX.0.0 - Major "Se incrementa solamente si se introducen cambios incompatibles con la versión anterior. Este puede incluir cambios de nivel menor y parches. Versiones parche y menores deben ser reiniciadas a 0"

## ¿Como instalar la primera versión?

`npm install template@git+ssh://git@gitlab.facturaoncloud.mx/angular/libreria.git#v1.0.0+angular-11.x.x`

## ¿Como instalar una versión especifica?

`npm install template@git+ssh://git@gitlab.facturaoncloud.mx/angular/libreria.git#semver:=v1.0.0+angular-11.x.x`

## ¿Como instalar para futuras correcciones menores?

`npm install template@git+ssh://git@gitlab.facturaoncloud.mx/angular/libreria.git#semver:~v1.0.0+angular-11.x.x`

## ¿Como instalar para futuras correcciones mayores?

`npm install template@git+ssh://git@gitlab.facturaoncloud.mx/angular/libreria.git#semver:^v1.0.0+angular-11.x.x`

## Requisitos

librería desarrolo(.i4b) en '$HOME/.i4b'

cd $HOME
git clone git@gitlab.facturaoncloud.mx:desarrollo/desarrollo.git .i4b
echo "export PATH=$HOME/.i4b:$PATH" >> $HOME/.profile

## Documentación

Semantic Versioning 2.0.0-rc.2:
https://semver.org

NPM semver:
https://docs.npmjs.com/cli/v6/using-npm/semver

## Herramientas

NPM semver calculator:
https://semver.npmjs.com

Semver Checker:
https://jubianchi.github.io/semver-check
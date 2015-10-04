Primero instalar la base de datos ejecutando el installdb

//Urls de Tareas
1. login
http://localhost:3000/apiv1/login/authenticate/

2. Register
http://localhost:3000/apiv1/login/register

3. Filter
	1.Name
	http://localhost:3000/product/name/(primera letra en mayusculas)
	2.Tags
	http://localhost:3000/product/tags/(el nombre del tags)
	3.Price
	http://localhost:3000/product/price/(precio minimo)&(precio maximo)
	4.Sales
	http://localhost:3000/product/sales/(venta|busqueda)

4. Token
http://localhost:3000/token/(token)
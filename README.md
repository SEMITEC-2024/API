# SEMITEC API
Aprendizaje de la mecanografía enfocado en personas con discapacidad visual

### Obtener tipos de cuentas
Para obtener los tipos de cuentas se debe utilizar el endpoint `/account-type`.

    GET http://server-ip:3000/account-type

    [
        {
            "user_type_id": 1,
            "name": "Estudiante"
        },
        {
            "user_type_id": 2,
            "name": "Tutor"
        }
    ]

### Obtener lista de países
Para obtener la lista de países se debe utilizar el endpoint `/countries`.

    GET http://server-ip:3000/countries

    [
        {
            "country_id": 1,
            "name": "Costa Rica"
        }
    ]

### Obtener todas las provincias de un país
Se pueden obtener todas las provincas de un país agregando el id del país como parámetro `/provinces?country_id=1`

    GET http://server-ip:3000/provinces?country_id=1

    [
        {
            "province_id": 1,
            "name": "San José"
        },
        {
            "province_id": 2,
            "name": "Alajuela"
        },
        {
            "province_id": 3,
            "name": "Cartago"
        },
        {
            "province_id": 4,
            "name": "Heredia"
        },
        {
            "province_id": 5,
            "name": "Guanacaste"
        },
        {
            "province_id": 6,
            "name": "Puntarenas"
        },
        {
            "province_id": 7,
            "name": "Limón"
        }
    ]


### Obtener todos los cantones de una provincia
Se pueden obtener todos los cantones de una provincia agregando el id de la provincia como parámetro `/cantons?province_id=3`

    GET http://server-ip:3000/cantons?province_id=3

    [
        {
            "canton_id": 1,
            "name": "Alvarado"
        },
        {
            "canton_id": 2,
            "name": "Cartago"
        },
        {
            "canton_id": 3,
            "name": "El Guarco"
        },
        {
            "canton_id": 4,
            "name": "Jiménez"
        },
        {
            "canton_id": 5,
            "name": "La Unión"
        },
        {
            "canton_id": 6,
            "name": "Oreamuno"
        },
        {
            "canton_id": 7,
            "name": "Paraíso"
        },
        {
            "canton_id": 8,
            "name": "Turrialba"
        }
    ]

### Obtener todas las instituciones de un país
Se pueden obtener todas las instituciones de un país agregando el id del país como parámetro `/institutions?country_id=1`

    GET http://server-ip:3000/institutions?country_id=1

    [
        {
            "institution_id": 1,
            "name": "Escuela Padre Peralta"
        },
        {
            "institution_id": 2,
            "name": "Escuela de los Angeles"
        },
        {
            "institution_id": 3,
            "name": "Escuela Nuestra Señora de Fátima"
        },
        {
            "institution_id": 4,
            "name": "Escuela de Quircot"
        },
        {
            "institution_id": 5,
            "name": "Escuela el Bosque"
        },
        {
            "institution_id": 6,
            "name": "Colegio San Luis Gonzaga"
        }
    ]

### Registrar cuenta
Se puede registar una cuenta utilizando el endpoint `/register` mediante el método `POST`.
El método requiere un body con la siguiente estructura:

    {
        "user_type_id": 1,
        "institution_id": 1,
        "district_id": 1,
        "password": "contraseña",
        "email": "user.email@algo.com",
        "name": "nombre del usuario"
    }

### Autenticar inicio de sesión
Se puede autenticar el inicio de sesión utilizando el endpoint `/login` mediante el método `POST`.
El método requiere un body con la siguiente estructura:

    {
        "password": "contraseña",
        "email": "user.email@algo.com"
    }

Se retornará un `JSON` que contiene el resultado de la autenticación y un mensaje:

    // Credeciales correctos
    {
        "permission": "true",
        "message": "Usuario autenticado con éxito"
    }

    // Usuario existente con contraseña incorrecta
    {
        "permission": "false",
        "message": "Contraseña incorrecta"
    }

    // Usuario no registrado
    {
        "permission": "false",
        "message": "Este usuario no se encuentra registrado"
    }

Además, si la autenticación fue exitosa, se retornara en el encabezado, un token `jwt` con la siguiente estructura:

    auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyLWlkIjoiMTYiLCJ1c2VyX3R5cGVfaWQiOiIxIiwidXNlcm5hbWUiOiJQZXBlIENhbW90ZXMiLCJ1c2VyX3R5cGVfbmFtZSI6IkVzdHVkaWFudGUiLCJpYXQiOjE3MTQ4Mjg4NTJ9.RxJ-oPBGskj24kwQxhTmlHlhSjQmEzGY6wGNuWR6f0k
    
    PAYLOAD: DATA
    {
        "user-id": "16",
        "user_type_id": "1",
        "username": "Pepe Camotes",
        "user_type_name": "Estudiante",
        "iat": 1714828852
    }

### Obtener lista de lecciones
Se puede obtener la lista de todas las lecciones utiliando el endpoint `/lessons`.

    GET http://server-ip:3000/lessons

    [
        {
            "lesson_id": 1,
            "name": "Saludos",
            "words": "hola mundo",
            "description": "Practica escribiendo saludos básicos."
        },
        {
            "lesson_id": 2,
            "name": "Frutas",
            "words": "manzana naranja pera",
            "description": "Practica escribiendo nombres de frutas comunes."
        },
        {
            "lesson_id": 3,
            "name": "Velocidad",
            "words": "rápido zorro marrón",
            "description": "Ejercicio de velocidad con palabras difíciles."
        },
        {
            "lesson_id": 4,
            "name": "Complejidad",
            "words": "ejemplo complicado",
            "description": "Practica con frases complejas."
        },
        {
            "lesson_id": 5,
            "name": "Desafío extremo",
            "words": "excepcionalmente difícil",
            "description": "Un ejercicio de mecanografía muy desafiante."
        },
        {
            "lesson_id": 6,
            "name": "Seguridad",
            "words": "criptografía avanzada",
            "description": "Practica escribiendo palabras relacionadas con la seguridad informática."
        }
    ]

### Obtener una lección específica
Se puede obtener los datos de una lección especifica agregando el id de la lección como parámetro `/lesson?lesson_id=1`

    GET http://server-ip:3000/lessons?lesson_id=1

    [
    {
        "lesson_id": 1,
        "words": "hola mundo",
        "iterations": 5,
        "min_time": 60,
        "min_mistakes": 0
    }
]
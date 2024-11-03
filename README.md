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

### Registrar usuario como tutor 
Se puede registar una cuenta utilizando el endpoint `/register-teacher` mediante el método `POST`.
El método requiere un body con la siguiente estructura:

    {
        "user_type_id": 2,
        "user_configuration_id": {{randomConfigurationId}},
        "institution_id": {{randomInstitutionId}},
        "district_id": {{randomDistrictId}},
        "name": "{{$randomFullName}}",
        "password": "teacher",
        "email": "{{$randomEmail}}",
        "other_signs": "{{$randomStreetAddress}}"
    }

La estructura anterior puede ser probada con Postman agregado el siguiente script en el apartado `scripts pre-request`:
    
    const randomInstitution = Math.floor(Math.random() * 6) + 1;
    const randomConfigurationId = Math.floor(Math.random() * 3) + 1;
    const randomDistrictId = Math.floor(Math.random() * 459) + 1;

    // save eviroment variables
    pm.environment.set("randomInstitutionId", randomInstitution);
    pm.environment.set("randomConfigurationId", randomConfigurationId);
    pm.environment.set("randomDistrictId", randomDistrictId);
    pm.environment.set("randomInstitution", randomInstitution);

### Registrar usuario como estudiante
Se puede registar una cuenta utilizando el endpoint `/register-teacher` mediante el método `POST`.
El método requiere un body con la siguiente estructura:

    {
        "user_type_id": 1,
        "user_configuration_id": {{randomConfigurationId}},
        "institution_id": {{randomInstitutionId}},
        "district_id": {{randomDistrictId}},
        "name": "{{$randomFullName}}",
        "password": "student",
        "email": "{{$randomEmail}}",
        "other_signs": "{{$randomStreetAddress}}",
        "education_level_id": {{randomEducationLevelId}},
        "date_birth": "{{pastDate}}"
    }

La estructura anterior puede ser probada con Postman agregado el siguiente script en el apartado `scripts pre-request`:

    const moment = require('moment')
    const randomInstitution = Math.floor(Math.random() * 6) + 1;
    const randomConfigurationId = Math.floor(Math.random() * 3) + 1;
    const randomDistrictId = Math.floor(Math.random() * 459) + 1;
    const randomEducationLevelId = Math.floor(Math.random() * 3) + 1;
    let pastDate = pm.variables.replaceIn('{{$randomDatePast}}')
    pastDate = moment(pastDate).format(("YYYY-MM-DD"))

    // save enviroment variables
    pm.environment.set("randomInstitutionId", randomInstitution);
    pm.environment.set("randomConfigurationId", randomConfigurationId);
    pm.environment.set("randomDistrictId", randomDistrictId);
    pm.environment.set("randomEducationLevelId", randomEducationLevelId);
    pm.variables.set("pastDate", pastDate);

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
Se puede obtener la lista de todas las lecciones utilizando el endpoint `/lessons`.

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

### Obtener grupos por profesor
Se pueden obtener los grupos por profesor agregando el id del profesor como parámetro `/teacher/groups?teacher_id=11`

    GET http://server-ip:3000/teacher/groups?teacher_id=11

    [
        {
            "group_id": 2,
            "name": "Grupo B",
            "progress": "Frutas",
            "total_students": 2
        }
    ]

### Obtener información del perfil de usuario
Se puede obtener la información del perfil agregando el id del usuario como parámetro `/profile?user_id=1`.

    GET http://25.37.76.172:5000/profile?user_id=1

    [
        {
            "name": "José Pérez",
            "user_type": "Estudiante",
            "institution": "Escuela Padre Peralta",
            "district": "Pacayas",
            "user_code": "adwf",
            "canton": "Alvarado",
            "province": "Cartago",
            "country": "Costa Rica",
            "email": "jose.perez@estudiantec.cr"
        }
    ]


### Obtener estudiantes por grupo
Se pueden obtener los estudiantes de un grupo agregando el id del grupo como parámetro `/group/students?group_id=3`

    GET http://25.37.76.172:5000/group/students?group_id=3

    [
        {
            "student_id": 3,
            "name": "Pedro Castro"
        },
        {
            "student_id": 8,
            "name": "Lucía Sánchez"
        }
    ]

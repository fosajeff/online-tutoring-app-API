# REST API for Online Tutorial Application

This is an online tutorial application REST API.

<https://my-online-tutor.herokuapp.com>


The REST API to the online tutorial app is described below.


## Signup as User

### Request

`POST /signup/`

## Required body:

- full_name
- email
- password

### Response

    {
        "message": "Proceed to login with",
        "email": "user@email.com"
    }

## Login as User

## Required body:

- email
- password

### Request

`POST /login`

### Response
    
    {
        "message": "Login successful",
        "_id": "5eb5da3b992be34dcc0217fe",
        "token": "somerandomtoken"
    }


## Signup as Tutor

### Request

`POST /signup/tutor`

## Required body:

- first_name
- last_name
- email
- password

### Response

    {
        "message": "Proceed to login with",
        "email": "user@email.com"
    }

## Login as Tutor

### Request

`POST /login/tutor`

## Required body:

- email
- password

### Response
    
    {
        "message": "Login successful",
        "_id": "5eb5da3b992be34dcc0217fe",
        "token": "somerandomtoken"
    }

## An Admin can login in through any routes with the following details
* email: admin@mail.com
* password: #admin#

## Get all categories

Access: Requires authentication

### Request

`GET /categories`

### Response

    [
        {
            subjects: [],
            "tutors": [],
            "_id": "5eb67ac8bd58b7104e504349",
            "category_name": "JSS",
            "__v": 0
        },
        {
            subjects: [],
            "tutors": [],
            "_id": "5peolrkajijER7893494eFGr",
            "category_name": "Primary",
            "__v": 0
        },
    ]

## Get a category by id

Access: Requires authentication

### Request

`GET /categories/:id`

#### Example Request

`GET /categories/JSS`

### Response

    {
        subjects: [],
        "tutors": [],
        "_id": "5eb67ac8bd58b7104e504349",
        "category_name": "JSS",
        "__v": 0
    }


## Create a category

Access: Admin Only

### Request

`POST /categories`

## Required Body:

- category_name: String

#### Example Request

`POST /categories`

> category_name: Primary

### Response

    {
        "subjects": [],
        "tutors": [],
        "_id": "5eb67ac8bd58b7104e504349",
        "category_name": "Primary",
        "__v": 0
    }

## Update a category

Access: Admin Only

### Request

`PUT /categories/:id`

## Required body:

- category_name: String

## Optional body:

- tutors: [String]

#### Example Request

`PUT /categories/Primary`

> category_name: Primary
> tutors: ["Tutor One", "Tutor Two"]

### Response

    {
        "message": "Update Successful"
    }


## Delete a category

Access: Admin Only

### Request

`DELETE /categories/:id`

#### Example Request

`DELETE /categories/Primary`

### Response

    [
        {"message": "1 category deleted"}
    ]

## Get all subjects by category

Access: Requires authentication

### Request

`GET /categories/:category/subjects`

#### Example Request

`GET /categories/Primary/subjects`

### Response

    [
        {
            "_id": "5eb67bokekjfb7104e50434a",
            "name": "Mathematics",
            "category": "Primary",
            "__v": 0
        },
        {
            "_id": "5eb67bokekjfb7104e50434a",
            "name": "Social Studies",
            "category": "Primary",
            "__v": 0
        }
    ]

## Get a subject in a category by id

Access: Requires authentication

### Request

`GET /categories/:category/subjects/:id`

#### Example Request

`GET /categories/Primary/subjects/Mathematics`

### Response

    {
        "_id": "5eb67bokekjfb7104e50434a",
        "name": "Mathematics",
        "category": "Primary",
        "__v": 0
    }


## Search a subject by subject name

Access: Requires authentication

### Request

`GET /subjects?sname=:id`

#### Example Request

`GET /subjects?sname=Mathematics`

### Response

    [
        {
            "_id": "5eb67b723lvp039fve50434a",
            "name": "Mathematics",
            "category": "JSS",
            "__v": 0
        },
        {
            "_id": "5woerbokekweigg4eWT4Qrie",
            "name": "Mathematics",
            "category": "Primary",
            "__v": 0
        },
        {
            "_id": "5gh3j4ktgto23l104e50434a",
            "name": "Mathematics",
            "category": "SSS",
            "__v": 0
        }
    ]

## Add a subject

Access: Admin Only

### Request

`POST /categories/:category/subjects`

## Required Body:

- name: String

#### Example Request

`POST /categories/JSS/subjects`

> name: Geography

### Response

    {
        "subjects": [
            {
                "_id": "5eb67bfabd58b7104e50434a",
                "name": "Geography",
                "category": "JSS",
                "__v": 0
            }
        ],
        "tutors": [],
        "_id": "5eb67ac8bd58b7104e504349",
        "category_name": "JSS",
        "__v": 1
    }


## Update a subject by id

Access: Admin Only

### Request

`PUT /categories/:category/subjects/:id`

## Required Body:

- name: String

#### Example Request

`PUT /categories/Primary/subjects/Geography`

> name: Literature

### Response

{
    "message": "Update Successful"
}

## Delete a subject by id

Access: Admin Only

### Request

`DELETE /categories/:category/subjects/:id`

#### Example Request

`DELETE /categories/JSS/subjects/Literature`

### Response

    {
        "message": "1 subject deleted"
    }

## Get all lessons

Access: Admin only

### Request

`GET /lessons`

### Response

[
    {
        "_id": "5eb5a9081dd96730baa54f60",
        
        "title": "Being sure of what you have received",
        "subject": "CRS",
        "category": "Primary",
        "content": "This is the content of this lesson",
        "__v": 0
    },
    {
        "_id": "5eb5a9081dd967fjfh4H4f60",
        "title": "The wave particle paradox",
        "subject": "Physics",
        "category": "SSS",
        "content": "This is the content of this lesson",
        "__v": 0
    },
]

## Get a lesson by id

Access: Admin only

### Request

`GET /lessons:id`

#### Example Request

`GET /lessons/Optics`

### Response

    [
    {
        "_id": "5eb5sd0ghjd96730baa54f60",
        "title": "Optics",
        "subject": "Physics",
        "category": "SSS",
        "content": "This is the content of this lesson",
        "__v": 0
    }
]

## Create a lesson

Access: Admin only

### Request

`POST /lessons`

## Required Body:

- title: String
- subject: String
- category: String

## Optional Body:

    - content: String

#### Example Request

`POST /lessons`

- title: Optics
- subject: Physics
- category: SSS
- content: "This is an introduction to wave optics"

### Response

    {
        "_id": "5eb680a1bd58b7104e50434c",
        "title": "Optics",
        "subject": "Physics",
        "category": "SSS",
        "content": "This is an introduction to wave optics",
        "__v": 0
    }

## Update a lesson

Access: Admin only

### Request

`PATCH /lessons/:id`

## Optional Body:

- title: String
- content: String

#### Example Request

`PATCH /lessons/Optics`

- title: Wave Optics
- content: "This is an introduction to wave optics and wave theory"

### Response

    {
        message: "Update Successful"
    }

## Delete a lesson

Access: Admin only

### Request

`DELETE /lessons/:id`

#### Example Request

`DELETE /lessons/Optics`

### Response

    {
        "message": "Delete Successful"
    }


# Book a lesson

Access: Requires authentication

### Request

`POST /lessons/book`

## Required Body:

- full_name: String
- subject: String
- tutor: String
- category: String
- time_of_day: String

## Optional Body:

- challenges: String

#### Example Request

`POST /lessons/book`

- full_name: John Doe
- subject: Chemistry
- tutor: Ani Walker
- category: SSS
- time_of_day: Afternoon
- challenges: "I am having problem with understand how to balance chemical equations"

### Response

    {
        "message": "Your lesson has been booked, we will contact your tutor."
    }


## Search a tutor by first name

Access: Requires authentication

### Request

`GET /tutors?fname=:id`

#### Example Request

`GET /tutors?fname=Michael`

### Response

{
    "subjects": ["Maths", "PHE", "CRS"],

    "category": ["Primary", "SSS"],
    "is_active": true,
    "_id": "5eb57350d476ca1144bcc8e5",
    "first_name": "Michael",
    "last_name": "Phillips",
    "email": "phil@gmail.com",
    "role": "tutor",
    "createdAt": "2020-05-08T14:57:20.984Z",
    "updatedAt": "2020-05-08T20:31:40.958Z",
    "__v": 28
}


## Get a tutor in a category

Access: Requires authentication

### Request

`GET /categories/:category/tutors`

#### Example Request

`GET /categories/JSS/tutors`

### Response

    [
        subjects: [
            {
                "_id": "5rb97bokekjb710l2e5rlv4a",
                "name": "Mathematics",
                "category": "JSS",
                "__v": 0
            } 
        ],
        tutors: [
            {
                "_id": "5rb97voego934672hek943ew",
                "first_name": "James",
                "last_name: "Matt",
                "subject": "Mathematics",
                "category": "JSS",
                "__v": 0
            }
        ],
        "_id": "5eb67ac8bd58b7104e504349",
        "category_name": "JSS",
        "__v": 0
    ]

## Register a subject

Access: Admin and Tutors

### Request

`PUT /categories/:category/tutors`

## Required Body:

- tutor: String
- subject: String

#### Example Request

`PUT /categories/JSS/tutors`

- tutor: "James Matt"
- subject: "English Language"

### Response

    {
        message: "Update Successful"
    }

## Unregister a subject

Access: Admin and Tutors

### Request

`DELETE /categories/:category/tutors`

## Required Body:

- tutor: String
- subject: String

#### Example Request

`DELETE /categories/JSS/tutors`

- tutor: "James Matt"
-  subject: "English Language"

### Response

    

## Make tutor an admin ( search for tutor to get his id )

Access: Admin

### Request

`PUT /tutor/:id`

#### Example Request

`PUT /tutor/5eb5da3b992be34dcc0217fe`

### Response

    {
        message: "Role changed to admin"
    }

## Remove tutor from admin ( search for tutor to get his id )

Access: Admin

### Request

`DELETE /tutor/:id`

#### Example Request

`DELETE /tutor/5eb5da3b992be34dcc0217fe`

### Response

    {
        message: "Role changed to tutor"
    }

## Deactivate a tutor ( search for tutor to get his id )

Access: Admin

### Request

`PUT /tutor/:id/deactivate`

#### Example Request

`PUT /tutor/5eb5da3b992be34dcc0217fe/deactivate`

### Response

    [
        {"message": "John Doe is deactivated"}

    ]

## Activate a tutor ( search for tutor to get his id )

Access: Admin

### Request

`PUT /tutor/:id/activate`

#### Example Request

`PUT /tutor/5eb5da3b992be34dcc0217fe/activate`

### Response

    [
        {"message": "John Doe is activated"}

    ]

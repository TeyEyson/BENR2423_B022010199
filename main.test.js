const { exportDefaultDeclaration } = require('@babel/types');
const supertest = require('supertest');
const { isTypedArray } = require('util/types');
const request = supertest('http://localhost:3000');
const admin_token = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhIiwicG9zaXRpb24iOiJhZG1pbiIsImlhdCI6MTY1NTQ2NDc1MiwiZXhwIjoxNjg3MDIyMzUyfQ.HyB5QHXUuMgttk1eooZRX_7S_p8QLg3w-NtC8PGbvGA";
const security_token = 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxIiwicG9zaXRpb24iOiJzZWN1cml0eSIsImlhdCI6MTY1NTQ4MzU5OSwiZXhwIjoxNjg3MDQxMTk5fQ.umXv5PSpF02ljPbHgPiTHimVGxO0J9igX99Oq3RgNd8";


describe('Express Route Test', function(){

    // it('Register user successful', async() => {
    //     return request
    //     .post('/register_user')
    //     .send({
    //         "username": "test1",
    //         "password": "test2",
    //         "registration_date": "test3",
    //         "position": "admin"
    //     })

    //     .expect(200).then(response => {
    //         expect(response.body).toEqual(
    //             expect.arrayContaining([
    //                 {
    //                     _id:expect.anything(),
    //                     "username": expect.any(String),
    //                     "password": expect.any(String),
    //                     "registration_date": expect.any(String),
    //                     "position": expect.any(String)
    //                 }
    //             ])
    //         );
    //     }
    //     )
    // }
    // )

    // it('Register user unsuccessful', async() => {
    //     return request
    //     .post('/register_user')
    //     .send({
    //         "username": "test1",
    //         "password": "test2",
    //         "registration_date": "test3",
    //         "position": "admin"
    //     })

    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to register user");
    //     }
    //     )
    // }
    // )

    // it('Login user successful', async() => {
    //     return request
    //     .post('/login_user')
    //     .send({
    //         "username": "test1",
    //         "password": "test2"
    //     })

    //     .expect(200).then(response => {
    //         expect(response.body).toEqual(
    //             expect.arrayContaining([
    //                 {
    //                     _id: expect.anything(),
    //                     "username": "test1",
    //                     "password": expect.any(String),
    //                     "registration_date": expect.any(String),
    //                     "token": expect.any(String),
    //                     "position": expect.any(String)
    //                 }
    //             ])
    //         );
    //     }
    //     )
    // }
    // )

    // it('Login user unsuccessful', async() => {
    //     return request
    //     .post('/login_user')
    //     .send({
    //         "username": "test123",
    //         "password": "test2"
    //     })

    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to login user");
    //     }
    //     )
    // }
    // )

    // it('View user successful', async() => {
    //     return request
    //     .post('/view_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "test1"
    //     })
    //     .expect(200).then(response => {
    //         expect(response.body).toEqual(
    //             expect.arrayContaining([
    //                 {
    //                     _id: expect.anything(),
    //                     "username": "test1",
    //                     "password": expect.any(String),
    //                     "registration_date": expect.any(String),
    //                     "position": expect.any(String)
    //                 }
    //             ])
    //         );
    //     }
    //     )
    // }
    // )

    // it('View user unsuccessful', async() => {
    //     return request
    //     .post('/view_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "test123"
    //     })
    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to view user");
    //     }
    //     )
    // }
    // )

    // it('Update user successful', async() => {
    //     return request
    //     .patch('/update_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "test1",
    //         "position": "security"
    //     })
    //     .expect(200).then(response => {
    //         expect(response.body).toEqual(
    //             expect.arrayContaining([
    //                 {
    //                     _id: expect.anything(),
    //                     "username": "test1",
    //                     "password": expect.any(String),
    //                     "registration_date": expect.any(String),
    //                     "position": "security"
    //                 }
    //             ])
    //         );
    //     }
    //     )
    // }
    // )

    // it('Update user fail', async() => {
    //     return request
    //     .patch('/update_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "test123",
    //         "position": "security"
    //     })
    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to update user");
    //     }
    //     )
    // }
    // )

    // it('Delete user successful', async() => {
    //     return request
    //     .delete('/delete_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "testa"
    //     })
    //     .expect(200).then(response => {
    //         expect(response.text).toEqual("Successfully delete user");
    //     }
    //     )
    // }
    // )

    // it('Delete user fail', async() => {
    //     return request
    //     .delete('/delete_user')
    //     .set('Authorization', admin_token)
    //     .send({
    //         "username": "test123"
    //     })
    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to delete user");
    //     }
    //     )
    // }
    // )

    // it('Register security successful', async() => {
    //     return request
    //     .post('/register_security')
    //     .send({
    //         "username": "test1",
    //         "password": "test2",
    //         "registration_date": "test3",
    //         "gate_incharged": "test4",
    //         "position": "security"
    //     })

    //     .expect(200).then(response => {
    //         expect(response.body).toEqual(
    //             expect.arrayContaining([
    //                 {
    //                     _id:expect.anything(),
    //                     "username": "test1",
    //                     "password": expect.any(String),
    //                     "registration_date": expect.any(String),
    //                     "gate_incharged": expect.any(String),
    //                     "position": "security"
    //                 }
    //             ])
    //         );
    //     }
    //     )
    // }
    // )

    // it('Register security unsuccessful', async() => {
    //     return request
    //     .post('/register_security')
    //     .send({
    //         "username": "test1",
    //         "password": "test2",
    //         "registration_date": "test3",
    //         "gate_incharged": "test4",
    //         "position": "security"
    //     })

    //     .expect(401).then(response => {
    //         expect(response.text).toEqual("Fail to register security");
    //     }
    //     )
    // }
    // )

// it('Login security successful', async() => {
//     return request
//     .post('/login_security')
//     .send({
//         "username": "test1",
//         "password": "test2"
//     })

//     .expect(200).then(response => {
//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 {
//                     _id: expect.anything(),
//                     "username": "test1",
//                     "password": expect.any(String),
//                     "token": expect.any(String),
//                     "registration_date": expect.any(String),
//                     "gate_incharged": expect.any(String),
//                     "position": "security"
//                 }
//             ])
//         );
//     }
//     )
// }
// )

// it('Login security unsuccessful', async() => {
//     return request
//     .post('/login_security')
//     .send({
//         "username": "test1",
//         "password": "test123"
//     })

//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to login security");
//     }
//     )
// }
// )

// it('View security successful', async() => {
//     return request
//     .post('/view_security')
//     .set('Authorization', admin_token||security_token)
//     .send({
//         "username": "test1"
//     })
//     .expect(200).then(response => {
//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 {
//                     _id: expect.anything(),
//                     "username": "test1",
//                     "password": expect.any(String),
//                     "registration_date": expect.any(String),
//                     "gate_incharged": expect.any(String),
//                     "position": "security"
//                 }
//             ])
//         );
//     }
//     )
// }
// )

// it('View security unsuccessful', async() => {
//     return request
//     .post('/view_security')
//     .set('Authorization', security_token||admin_token)
//     .send({
//         "username": "test123"
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to view security");
//     }
//     )
// }
// )

// it('Update security successful', async() => {
//     return request
//     .patch('/update_security')
//     .set('Authorization', admin_token||security_token)
//     .send({
//         "username": "test1",
//         "gate_incharged": "testz"
//     })
//     .expect(200).then(response => {
//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 {
//                     _id: expect.anything(),
//                     "username": "test1",
//                     "password": expect.any(String),
//                     "registration_date": expect.any(String),
//                     "gate_incharged": expect.any(String),
//                     "position": "security"
//                 }
//             ])
//         );
//     }
//     )
// }
// )

// it('Update security unsuccessful', async() => {
//     return request
//     .patch('/update_security')
//     .set('Authorization', security_token||admin_token)
//     .send({
//         "username": "test123",
//         "gate_incharged": "testz"
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to update security");
//     }
//     )
// }
// )

// it('Delete security successful', async() => {
//     return request
//     .delete('/delete_security')
//     .set('Authorization', admin_token||security_token)
//     .send({
//         "username": "test1"
//     })
//     .expect(200).then(response => {
//         expect(response.text).toEqual("Successfully deleted security");
//     }
//     )
// }
// )

// it('Delete security unsuccessful', async() => {
//     return request
//     .delete('/delete_security')
//     .set('Authorization', security_token||admin_token)
//     .send({
//         "username": "test123"
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to delete security");
//     }
//     )
// }
// )

// it('Register visitor successful', async() => {

//     return request
//     .post('/register_visitor')
//     .send({
//         "name": "test1",
//         "identification_number": "test2",
//         "gender":"test3",
//         "phone_number":"test4",
//         "vehicle_no":"test5",
//         "vaccine_status":"test6",
//         "venue":"test7",
//         "parking_lot":"test8"
//     })
//     .expect(200).then(response => {
//         expect(response.text).toEqual("Register visitor successful");
//     }
//     )
// }
// )

// it('Register visitor unsuccessful', async() => {
//     return request
//     .post('/register_visitor')
//     .send({
//         "name": "Yim",
//         "identification_number": "865732-03-6627",
//         "gender":"test3",
//         "phone_number":"test4",
//         "vehicle_no":"test5",
//         "vaccine_status":"test6",
//         "venue":"test7",
//         "parking_lot":"test8"
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to register visitor");
//     }
//     )
// }
// )

// it ('Blacklist visitor successful', async() => {
//     return request
//     .post('/blacklist_visitor')
//     .set('Authorization', admin_token||security_token)
//     .send({
//         "name": "testj",
//         "blacklist_username": "testj",
//         "NRIC": "test6",
//         "blacklist_reason": "test4",
//     })
//     .expect(200).then(response => {
//         expect(response.body).toEqual(
//             expect.arrayContaining([{
//             _id: expect.anything(),
//             "name": "testj",
//             "NRIC": expect.any(String),
//             "blacklist_reason": expect.any(String)
//             }])
//         );
//     }
//     )
// }
// )

// it ('Blacklist visitor unsuccessful', async() => {
//     return request
//     .post('/blacklist_visitor')
//     .set('Authorization', security_token||admin_token)
//     .send({
//         "name": "testj",
//         "blacklist_username": "testj",
//         "NRIC": "test6",
//         "blacklist_reason": "test4",
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to blacklist visitor" || "Invlid user");
//     }
//     )
// }
// )

// it('Delete visitor record successful', async() => {
//     return request
//     .delete('/delete_visitor_record')
//     .set('Authorization', admin_token||security_token)
//     .send({
//         "name": "test9"
//     })
//     .expect(200).then(response => {
//         expect(response.text).toEqual("Successfully delete visitor");
//     }
//     )
// }
// )

// it('Delete visitor record unsuccessful', async() => {
//     return request
//     .delete('/delete_visitor_record')
//     .set('Authorization', security_token||admin_token)
//     .send({
//         "name": "test123"
//     })
//     .expect(401).then(response => {
//         expect(response.text).toEqual("Fail to delete visitor"||"Invlid user");
//     }
//     )
// }
// )

// it ('/view_all_visitor_record', async() => {
//     return request
//     .get('/view_all_visitor_record')
//     .set('Authorization', admin_token||security_token)
//     .expect(200).then(response => {
//         expect(response.body).toEqual(
//             expect.arrayContaining([
//                 {
//                     _id: expect.anything(),
//                     "name": expect.any(String),
//                     "identification_number": expect.any(String),
//                     "gender":expect.any(String),
//                     "phone_number":expect.any(String),
//                     "vehicle_no":expect.any(String),
//                     "vaccine_status":expect.any(String),
//                     "venue":expect.any(String),
//                     "parking_lot":expect.any(String),
//                     "date":expect.anything(),
//                     "visiting_time":expect.anything()
//                 }
//             ])
//         );
//     }
//     )
// }
// )









})
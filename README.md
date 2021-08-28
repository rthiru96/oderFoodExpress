
## Getting started

```
npm install
npm run dev

a. Create an order
=======================
Request JSON
..............
{
    "orders":[{
        "id":"ITM002",
        "itemName":"Pizza",
        "qty":2,
        "price":20
      },{
        "id":"ITM003",
        "itemName":"Pie",
        "qty":3,
        "price":40
      }],
    "total": 200
}
Response
.........
[
    {
        "id": "57f023b7-8694-4905-a0ce-c0fd778c5243",
        "orders": [
            {
                "id": "ITM002",
                "qty": 2,
                "price": 20,
                "itemName": "Pizza"
            },
            {
                "id": "ITM003",
                "qty": 3,
                "price": 40,
                "itemName": "Pie"
            }
        ],
        "total": 200
    },
    {
        "id": "87ec57a1-cb06-4a2e-b4c0-f5d1c3abe3a7",
        "orders": [
            {
                "id": "ITM004",
                "qty": 2,
                "price": 20,
                "itemName": "Noodles"
            },
            {
                "id": "ITM005",
                "qty": 3,
                "price": 40,
                "itemName": "Wine"
            }
        ],
        "total": 200
    }
]


b. Get All Orders => http://localhost:4000/order.


```




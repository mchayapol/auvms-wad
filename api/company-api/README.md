# Quotation API
# WAD Class



## Run Database
```
docker compose -f stack.yml up
```

## Run App
```
yarn start
```

## Connect via NoSQL Booster
Set authentication db to "admin", default to "quotation" will fail
```
mongodb://root:mypasswordisstrong@localhost:27017/quotation?authSource=admin
```

Use ngrok
```
 ngrok http 3000
 ```
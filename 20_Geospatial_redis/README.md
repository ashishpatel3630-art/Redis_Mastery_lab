# 20 — Redis Geospatial

This folder demonstrates Redis geospatial capabilities for location-based queries.

## Core commands
```redis
GEOADD stores 77.5946 12.9716 store1
GEOADD stores 72.8777 19.0760 store2
GEOSEARCH stores FROMLONLAT 77.5946 12.9716 BYRADIUS 10 km
```

## Mental model
```text
             User
              |
              v
       Find nearby places
              |
              v
        Redis GEO index
              |
       +------+------+ 
       v      v      v
    Store A Store B Store C
```

## Real-world uses
- Nearby stores
- Delivery services
- Driver matching
- Ride-hailing
- Location search
- Food delivery

## Key idea
Redis geospatial data is backed by sorted-set capabilities and supports efficient location queries.

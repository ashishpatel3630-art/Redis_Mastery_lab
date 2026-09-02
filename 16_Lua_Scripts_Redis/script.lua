local balance = redis.call("GET", KEYS[1])
local amount = tonumber(ARGV[1])

balance = balance - amount

redis.call("SET", KEYS[1], balance)

return balance
import asyncio 

async def junk_is_about_to_start_moving(direction):
        while True:
            print(direction)
            await asyncio.sleep(2)

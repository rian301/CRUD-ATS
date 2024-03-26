#nullable disable
using Domain.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using WebMongoDB.Models;

namespace WebMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargoController : ControllerBase
    {
        // GET: Cargo
        [HttpGet]
        public async Task<List<Cargo>> GetAll()
        {
            ContextoMongodb dbContext = new ContextoMongodb();
            return await dbContext.Cargo.Find(u => true).ToListAsync();
        }

        // GET: Cargo/Details/5
        [HttpGet, Route("{id}")]
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ContextoMongodb dbContext = new ContextoMongodb();
            var cargo = await dbContext.Cargo.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (cargo == null)
            {
                return NotFound();
            }
            return Ok(cargo);
        }

        //// POST: Cargo/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Create([Bind("Id,Nome")] Cargo cargo)
        {
            if (ModelState.IsValid)
            {
                ContextoMongodb dbContext = new ContextoMongodb();
                cargo.Id = Guid.NewGuid();
                await dbContext.Cargo.InsertOneAsync(cargo);
                return Ok(cargo);
            }
            return BadRequest("Erro Ao Criar Cargo");
        }

        //// PUT: Cargo/Update
        [HttpPut, Route("{id}")]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Nome")] Cargo cargo)
        {
            if (id != cargo.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    ContextoMongodb dbContext = new ContextoMongodb();

                    await dbContext.Cargo.ReplaceOneAsync(m => m.Id == cargo.Id, cargo);

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CargoExists(cargo.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok(cargo);
        }


        //// GET: Cargo/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ContextoMongodb dbContext = new ContextoMongodb();

            await dbContext.Cargo.DeleteOneAsync(u => u.Id == id);
        
            return Ok();
        }

        private bool CargoExists(Guid id)
        {
            ContextoMongodb dbContext = new ContextoMongodb();
            var cargo = dbContext.Cargo.Find(u => u.Id == id).Any();

            return cargo;
        }
    }
}

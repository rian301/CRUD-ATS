#nullable disable
using Domain.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MongoDB.Driver;
using WebMongoDB.Models;

namespace WebMongoDB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatoController : ControllerBase
    {
        // GET: Candidato
        [HttpGet]
        public async Task<List<Candidato>> GetAll()
        {
            ContextoMongodb dbContext = new ContextoMongodb();
            return await dbContext.Candidato.Find(u => true).ToListAsync();
        }

        // GET: Candidato/Details/5
        [HttpGet, Route("{id}")]
        public async Task<IActionResult> Details(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ContextoMongodb dbContext = new ContextoMongodb();
            var candidato = await dbContext.Candidato.Find(u => u.Id == id).FirstOrDefaultAsync();

            if (candidato == null)
            {
                return NotFound();
            }
            return Ok(candidato);
        }

        // GET: Candidato/Details/email
        [HttpGet, Route("get-by-email/{email}")]
        public async Task<IActionResult> DetailsByEmail(String? email)
        {
            if (email == null)
            {
                return NotFound();
            }

            ContextoMongodb dbContext = new ContextoMongodb();
            var candidato = await dbContext.Candidato.Find(u => u.Email == email).FirstOrDefaultAsync();
            return Ok(candidato);
        }

        // GET: Candidato/Job
        [HttpGet, Route("get-jobs/{id}")]
        public async Task<IActionResult> getByJobs(String? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            ContextoMongodb dbContext = new ContextoMongodb();
            var candidato = await dbContext.Candidato.Find(u => u.Cargo == id).ToListAsync();
            return Ok(candidato);
        }

        //// POST: Candidato/Create
        //// To protect from overposting attacks, enable the specific properties you want to bind to.
        //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public async Task<IActionResult> Create([Bind("Id,Nome")] Candidato candidato)
        {
            if (ModelState.IsValid)
            {
                ContextoMongodb dbContext = new ContextoMongodb();
                candidato.Id = Guid.NewGuid();
                await dbContext.Candidato.InsertOneAsync(candidato);
                return Ok(candidato);
            }
            return BadRequest("Erro Ao Criar Candidato");
        }

        //// PUT: Candidato/Update
        [HttpPut, Route("{id}")]
        public async Task<IActionResult> Edit(Guid id, [Bind("Id,Nome")] Candidato candidato)
        {
            if (id != candidato.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    ContextoMongodb dbContext = new ContextoMongodb();

                    await dbContext.Candidato.ReplaceOneAsync(m => m.Id == candidato.Id, candidato);

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CandidatoExists(candidato.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok(candidato);
        }


        //// GET: Candidato/Delete/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            ContextoMongodb dbContext = new ContextoMongodb();

            await dbContext.Candidato.DeleteOneAsync(u => u.Id == id);

            return Ok();
        }

        private bool CandidatoExists(Guid id)
        {
            ContextoMongodb dbContext = new ContextoMongodb();
            var candidato = dbContext.Candidato.Find(u => u.Id == id).Any();

            return candidato;
        }
    }
}

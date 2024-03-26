using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Core.Models
{
    [Table("Cargo")]
    public class Cargo
    {
        [Column("Id")]
        [Display(Name = "Id")]
        public Guid Id { get; set; }

        [Column("Nome")]
        [Display(Name = "Nome")]
        public string? Nome { get; set; }
        [Column("Descricao")]
        [Display(Name = "Descricao")]
        public string? Descricao { get; set; }

        [Column("Requisitos")]
        [Display(Name = "Requisitos")]
        public string? Requisitos { get; set; }

        [Column("Empresa")]
        [Display(Name = "Empresa")]
        public string? Empresa { get; set; }

    }
}

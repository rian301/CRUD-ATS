import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidate } from '../../models/candidate.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private readonly urlApi = `${environment.urlApi}/api/candidato`;

constructor(private http: HttpClient) { }

  create(candidate: Candidate) {
    return this.http.post<Candidate>(this.urlApi, candidate);
  }

  getCandidateByEmail(email: string) {
    return this.http.get<Candidate>(`${this.urlApi}/get-by-email/${email}`);
  }

  getByJob(jobId: string) {
    return this.http.get<Candidate[]>(`${this.urlApi}/get-jobs/${jobId}`);
  }

  delete(id: string) {
    return this.http.delete<Candidate[]>(`${this.urlApi}/${id}`);
  }

}

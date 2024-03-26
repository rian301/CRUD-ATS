import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Job } from '../../models/job.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private readonly urlApi = `${environment.urlApi}/api/cargo`;

constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.urlApi);
  }

  get(id: string | null): Observable<Job> {
    if (id) {
      return this.http.get<Job>(`${this.urlApi}/${id}`);
    }
    return of();
  }

  create(job: Job) {
    return this.http.post<Job>(this.urlApi, job);
  }

  update(job: Job) {
    return this.http.put<Job>(`${this.urlApi}/${job.id}`, job);
  }

  delete(id: string) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

}

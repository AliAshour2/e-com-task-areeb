import { Component, Input } from '@angular/core';
import { DeveloperCardComponent } from '../../components/developer-card/developer-card.component';

import { FormsModule } from '@angular/forms'; // 
import { SearchService } from '../../shared/services/search/search.service';
import { SelectfilterComponent } from "../../shared/components/select/selectfilter/selectfilter.component";
import { ContactStatus } from '../../models/card.model';
@Component({
  selector: 'app-shop',
  imports: [DeveloperCardComponent, FormsModule, SelectfilterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
  standalone : true ,
})
export class ShopComponent {
  searchQuery = '';
  // @Input() searchQuery = '';
  selectedSort = 'default';
  selectedLevel = 'all';
 


  sortOptions = [
  { value: 'low', label: 'Price: Low to High' },
  { value: 'high', label: 'Price: High to Low' }
];

sizeOptions = [
  { value: 'Junior', label: 'Junior' },
  { value: 'Mid', label: 'Mid-Level' },
  { value: 'Senior', label: 'Senior' },
  { value: 'Lead', label: 'Lead' },
  { value: 'all', label: 'All Levels' }
];
  

  developers  = [
  {
    image: "https://i.pravatar.cc/100?img=1",
    name: "Sara Hassan",
    role: "Frontend Developer",
    level: "Mid",
    salary: 5000,
    description: "Specializes in building responsive UIs with Angular and React.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=2",
    name: "Ahmed ElSayed",
    role: "Backend Developer",
    level: "Senior",
    salary: 7500,
    description: "Experienced in Node.js, Express, and scalable REST APIs.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=3",
    name: "Yasmine Adel",
    role: "UI/UX Designer",
    level: "Mid",
    salary: 6000,
    description: "Focuses on user-centric design for web and mobile apps.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=4",
    name: "Omar Nabil",
    role: "DevOps Engineer",
    level: "Junior",
    salary: 4500,
    description: "Helps automate CI/CD pipelines and cloud deployment.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=5",
    name: "Laila Fathy",
    role: "QA Engineer",
    level: "Senior",
    salary: 5800,
    description: "Ensures software quality through manual and automated testing.",
    status: ContactStatus.NotContacted
  },
  {
    image: "https://i.pravatar.cc/100?img=6",
    name: "Mohamed Saeed",
    role: "Project Manager",
    level: "Lead",
    salary: 9000,
    description: "Coordinates tech teams and ensures timely delivery of projects.",
    status: ContactStatus.NotContacted
  },
];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.currentSearchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
  }


  onContact(product: any) {
    const found = this.developers .find(p => p.name === product.name);
    if (found) {
      found.status = found.status === ContactStatus.Contacted ? ContactStatus.NotContacted : ContactStatus.Contacted;
    }
  }

  get filteredProducts() {
    let filtered = [...this.developers ];

    if (this.selectedLevel !== 'all') {
      filtered = filtered.filter((p) => p.level === this.selectedLevel);
    }

    if (this.selectedSort === 'low') {
      filtered.sort((a, b) => a.salary - b.salary);
    } else if (this.selectedSort === 'high') {
      filtered.sort((a, b) => b.salary - a.salary);
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }

    return filtered;
  }
}

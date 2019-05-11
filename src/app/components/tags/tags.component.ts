import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent  {
  @Input() videoList;
  @Input() selectedVideo;
  @Output() valueChange = new EventEmitter();
  form: FormGroup;

  tags = [{id: 100, name: 'order 1' }];

  constructor(private formBuilder: FormBuilder) {
  }

  compare(b, a) {
    //return (b.name - a.name);
    return (a.id - b.id); //by count
  }

  get formData() {
    return this.form.get('form.controls.tags.controls');
  }

  ngOnInit() {
    const selectedTags = (this.selectedVideo && this.selectedVideo.snippet && this.selectedVideo.snippet.tags)
                       ? this.selectedVideo.snippet.tags.map(x => x) : [{}];

    let allTags = this.videoList.map(function(obj: any) { return obj.snippet.tags ? obj.snippet.tags : []; });

    let dictionary = {};
    allTags = allTags ? allTags : [];

    for ( let ii = 0; ii < allTags.length; ii++ ) {
      for (let k = 0; k < allTags[ii].length; k++) {
        const fldName: string = allTags[ii][k];
      //  console.log(`fldName = ${fldName}`);
        if (typeof((<any>dictionary)[fldName]) === 'undefined') {
          (<any>dictionary)[fldName] = 1;
        } else {
          (<any>dictionary)[fldName] =  (<any>dictionary)[fldName] + 1;
        }
      }
     }

    const list = Object.keys(dictionary).map(function(key) { return {name: key, id: dictionary[key]}; });
    const list22 = list.sort(this.compare);
    const maxTags  = 112;
    this.tags = list22.slice(0, maxTags);

    const controls = this.tags.map(c => new FormControl(false));

    // set tags they have been selected for this video.
    let i = controls.length;
    while (i--) {
      if (selectedTags.includes(this.tags[i].name)) {
        controls[i].setValue(true);
      }
    }

    //console.log("controls= ", controls);

    this.form = this.formBuilder.group({
      tags: new FormArray(controls, minSelectedCheckboxes(1)),
      additionalTags: new FormGroup({
        // street: new FormControl(''),
        newtags: new FormControl('')
      })
    });
  }

  submit() {
    const selectedOrderIds = this.form.value.tags
      .map((v, i) => v ? this.tags[i].name : null)
      .filter(v => v !== null);

    dynamicSortFI22(this.videoList, selectedOrderIds, 'asc');

    this.valueChange.emit({id: 'popup'});
  }

  cancel() {
    this.valueChange.emit({id: 'popup'});
  }
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function dynamicSortFI22(arr, query, direction) {
  arr.sort(function (a, b) {
    let achk = [];
    let bchk = [];

    if (a.snippet.tags) {
      achk = a.snippet.tags.filter(ee => {
        return query.indexOf(ee) > -1;
      });
    }

    if (b.snippet.tags) {
      bchk = b.snippet.tags.filter(ee => {
        return query.indexOf(ee) > -1;
      });
    }

    let bbb = 0;
    if (direction === 'asc') {
      bbb = bchk.length - achk.length;
    } else {
      bbb = achk.length - bchk.length
    }

    return bbb;
  });
}

function filterItems22(arr, query) {
  return arr.filter(elem => {
    var chk = 0;
    if (elem.snippet.tags) {
      // console.log(elem.snippet.tags);
      chk = elem.snippet.tags.filter(ee => {
        // console.log(`ee = ${ee}`);
        // console.log(`query = ${query}`);
        return query.indexOf(ee) > -1;
      }).length;
      // console.log(`chk = ${chk}`);
    }
    // console.log(`chk = ${chk}`);
    return chk;

  }); //.length;
}

function filterItems(arr, query) {
  return arr.filter((el) => {
    return el.snippet.tags ? el.snippet.tags.includes(query) : false;
  });
}

function dynamicSort22(tags, order = 'asc') {
  return function(a, b) {
    const ba = a.snippet.tags ? tags.filter(element => a.snippet.tags.includes(element)) : false;
    return  ba;
  }
}

function dynamicSort(property) {
  return function (a, b) {
    //const ba = a.snippet.tags ? propertys.filter(element => a.snippet.tags.includes(element)) : false;
    const ba = a.snippet.tags ? a.snippet.tags.includes(property) : false;
    const bb = b.snippet.tags ? b.snippet.tags.includes(property) : false;
    console.log(`ba= ${ba}`);
    console.log(`(ba && bb)= ${(ba && bb)}`);
    return (ba);  
    //return (ba ? ba.length : false);      
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

# sf-package-version-update-action

This is a VERY simple action, whose entire point is to make version increment to the sfdx-project json file.

The action is based on [this]( https://github.com/bitoiu/node-js-action-template) template, and the json editing is based on https://www.npmjs.com/package/edit-json-file. Any formatting for the environment variables is in the npm package.

## example usage
```yaml
      - name: manifest Version
        uses: rimonhanna/sf-package-version-update-action@master
```

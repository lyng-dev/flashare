$ErrorActionPreference = 'Stop'; # stop on all errors
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$packageArgs = @{
  packageName   = $env:ChocolateyPackageName
  fileType      = 'exe'
  file64        = "$toolsDir\flashare.exe"
  softwareName  = 'flashare'
  validExitCodes= @(0)
}

Install-ChocolateyPackage @packageArgs
Install-BinFile -Name flashare -Path $toolsDir\flashare.exe
Install-ChocolateyPath -PathToInstall "$toolsDir\"